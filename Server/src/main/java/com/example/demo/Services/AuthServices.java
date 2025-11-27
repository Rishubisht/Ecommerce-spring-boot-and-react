package com.example.demo.Services;

import com.example.demo.Dto.AuthResponse;
import com.example.demo.Dto.LoginRequest;
import com.example.demo.Dto.RegisterRequest;
import com.example.demo.Exception.DuplicateRecordException;
import com.example.demo.Model.RefreshToken;
import com.example.demo.Model.Roles;
import com.example.demo.Model.Users;
import com.example.demo.Model.VerificationToken;
import com.example.demo.Repository.RefreshTokenRepo;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Repository.VerificationTokenRepo;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AuthServices {

    // just for testing bcrypt speed
    @PostConstruct
    public void testBCryptSpeed() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(8);

        long start = System.currentTimeMillis();
        String hash = encoder.encode("password");
        encoder.matches("password", hash);
        long end = System.currentTimeMillis();

        System.out.println("BCrypt strength 8 test took: " + (end - start) + " ms");
    }
    // refresh token expiry duration from properties
    @Value("${jwt.refresh.expiration}")
    private String refreshTokenDurationMs;

    private final RefreshTokenRepo refreshTokenRepo;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final VerificationTokenRepo verificationTokenRepol;

    @Value("${app.base-url}")
    private String baseUrl;

    public AuthServices(
            RefreshTokenRepo refreshTokenRepo,
            UserRepository userRepo,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager,
            EmailService emailService,
            VerificationTokenRepo verificationTokenRepol
    ) {
        this.refreshTokenRepo = refreshTokenRepo;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
        this.verificationTokenRepol = verificationTokenRepol;
    }

    // ---------------- Register ----------------
    public AuthResponse Register(RegisterRequest req) {
     Optional<Users> existingUser = userRepo.existsByUserNameOrEmail(req.getUserName(),req.getEmail());
        if (existingUser.isPresent()) {
            Users exsistUser = existingUser.get();

            if(exsistUser.getEmail().equals(req.getEmail())){
                throw new DuplicateRecordException("User Already Registered with this Email");
            }
            else   if(exsistUser.getUserName().equals(req.getUserName())){
                throw new DuplicateRecordException("User Already Registered with this userName");
            }
        }


        Users user = new Users();
        user.setUserName(req.getUserName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.getRoles().add(Roles.USER);

        userRepo.save(user);

        // verification email
        VerificationToken verificationToken = new VerificationToken();
        String token = UUID.randomUUID().toString();
        verificationToken.setToken(token);
        verificationToken.setExpiryDate(LocalDateTime.now().plusMinutes(5));
        verificationToken.setUserId(user.getId());

        verificationTokenRepol.save(verificationToken);
        emailService.sendEmail(user.getEmail(),
                "Verification Mail",
                baseUrl + "/auth/verify?token=" + token
        );

        return new AuthResponse("Registration successful! Please verify your email.");
    }

    // ---------------- Login ----------------
    public ResponseEntity<AuthResponse> login(LoginRequest req) {
        long start = System.currentTimeMillis();
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUserNameOrEmail(), req.getPassword())
        );
        System.out.println("Auth time: " + (System.currentTimeMillis() - start) + "ms");
        long findStart = System.currentTimeMillis();
        Users user = userRepo.findByUserNameOrEmail(req.getUserNameOrEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("User fetch time: " + (System.currentTimeMillis() - findStart) + "ms");
        long tokenStart = System.currentTimeMillis();

        if (!user.isVerified()) {
            throw new RuntimeException("Please verify your email before logging in.");
        }

        // generate access token (JWT)
        String accessToken = jwtService.generateToken(
                user.getUserName(),
                user.getRoles()
        );
        System.out.println("JWT gen time: " + (System.currentTimeMillis() - tokenStart) + "ms");

        long refreshStart = System.currentTimeMillis();
        // generate refresh token and save to DB
        RefreshToken refreshToken = createRefreshToken(user.getId());

        // create secure HttpOnly cookie for refresh token
        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken.getToken())
                .httpOnly(true)
                .path("/")
                .maxAge(7 * 24 * 60 * 60) // 7 days
                .build();
        System.out.println("Refresh token time: " + (System.currentTimeMillis() - refreshStart) + "ms");

        long end = System.currentTimeMillis();
        System.out.println("Total login time: " + (end - start) + "ms");
        // return access token + set-cookie header
        return ResponseEntity.ok()
                .header("Set-Cookie", cookie.toString())
                .body(new AuthResponse(accessToken));


    }

    // ---------------- Email Verification ----------------
    public ResponseEntity<?> verifyToken(String token) {
        VerificationToken verificationToken = verificationTokenRepol.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Verification token not found"));

        if (verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Verification token expired.");
        }

        Users user = userRepo.findById(verificationToken.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.isVerified()) {
            return ResponseEntity.ok("User already verified.");
        }

        user.setVerified(true);
        userRepo.save(user);
        verificationTokenRepol.delete(verificationToken);

        return ResponseEntity.ok("Account verified successfully! You can now log in.");
    }

    // ---------------- Refresh Token Logic ----------------
    public RefreshToken createRefreshToken(String userId) {
        refreshTokenRepo.deleteByUserId(userId); // only one active refresh token per user
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setUserId(userId);
        refreshToken.setExpiryDate(Instant.now().plusMillis(Long.parseLong( refreshTokenDurationMs)));
        return refreshTokenRepo.save(refreshToken);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepo.delete(token);
            throw new RuntimeException("Refresh token expired. Please log in again.");
        }
        return token;
    }

    // ---------------- Generate New Access Token Using Refresh Token ----------------
    public ResponseEntity<AuthResponse> refreshAccessToken(String refreshTokenValue) {
        RefreshToken refreshToken = refreshTokenRepo.findByToken(refreshTokenValue)
                .map(this::verifyExpiration)      // it is equivalent to  .map(token -> this.verificationToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid Refresh Token"));

        Users user = userRepo.findById(refreshToken.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String newAccessToken = jwtService.generateToken(
                user.getUserName(),
                user.getRoles()
        );

        return ResponseEntity.ok(new AuthResponse(newAccessToken));
    }

    // ---------------- Logout ----------------
    public ResponseEntity<String> logout(String userId) {
        refreshTokenRepo.deleteByUserId(userId);

        // delete cookie by setting maxAge = 0
        ResponseCookie cookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .build();

        return ResponseEntity.ok()
                .header("Set-Cookie", cookie.toString())
                .body("Logged out successfully");
    }
}
