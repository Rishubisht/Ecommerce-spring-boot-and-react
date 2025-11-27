package com.example.demo.Services;

import com.example.demo.Model.Roles;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class JwtService {

    private static final String SECRET = "mysecretkeymysecretkeymysecretkey12345";
    private static final long EXPIRATION = 1000L * 60 * 60 * 2; // 2 hours
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    /** Generate token with role names (String values) */
    public String generateToken(String username, Set<Roles> roles) {

        List<String> roleNames = roles.stream()
                .map(Enum::name)   // ADMIN → "ADMIN"
                .collect(Collectors.toList());

        return Jwts.builder()
                .setSubject(username)
                .claim("roles", roleNames)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /** Extract username from JWT */
    public String extractUsername(String token) {
        return parseClaims(token).getSubject();
    }

    /** Extract roles as Strings from JWT */
    public Set<String> extractRoles(String token) {
        List<String> rolesList = parseClaims(token).get("roles", List.class);
        return Set.copyOf(rolesList);
    }

    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
