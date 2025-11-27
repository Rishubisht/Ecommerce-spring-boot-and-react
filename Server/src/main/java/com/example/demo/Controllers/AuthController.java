package com.example.demo.Controllers;

import com.example.demo.Dto.AuthResponse;
import com.example.demo.Dto.LoginRequest;
import com.example.demo.Dto.RegisterRequest;
import com.example.demo.Services.AuthServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {


    private final AuthServices authService;

    public AuthController(AuthServices authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse RegisterUser(@RequestBody RegisterRequest request) {
        return authService.Register(request);

    }
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshAccessToken(
            @CookieValue(name = "refreshToken", required = false) String refreshToken) {

        if (refreshToken == null) {
            return ResponseEntity.badRequest().body(
                    new AuthResponse("Missing refresh token")
            );
        }

        return authService.refreshAccessToken(refreshToken);
    }



    @PostMapping("/login")
    private AuthResponse loginUser(@RequestBody LoginRequest request){


  return authService.login(request).getBody();
    }

    @GetMapping("/verify")

    private ResponseEntity<?> verifyUser(@RequestParam("token") String token){
        return authService.verifyToken(token);
    }


}
