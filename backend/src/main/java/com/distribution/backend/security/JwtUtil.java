package com.distribution.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    // Secret key loaded from application.properties (recommended for production)
    // Fallback to a random key for development/testing only
    private final SecretKey secretKey;

    // Token expiration time in milliseconds (24 hours default)
    private final long expirationMs;

    /**
     * Constructor - injects values from application.properties
     *
     * @param jwtSecret     Base64-encoded secret key (256-bit minimum)
     * @param expirationMs  Token lifetime in milliseconds
     */
    public JwtUtil(
            @Value("${jwt.secret:your-very-long-random-base64-secret-key-here-min-256-bits}") String jwtSecret,
            @Value("${jwt.expiration:86400000}") long expirationMs) {

        // If no secret is provided in properties, generate a random one (dev only!)
        if (jwtSecret == null || jwtSecret.trim().isEmpty() || jwtSecret.equals("your-very-long-random-base64-secret-key-here-min-256-bits")) {
            this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
            System.out.println("WARNING: Using randomly generated JWT secret key (development only!)");
        } else {
            this.secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        }

        this.expirationMs = expirationMs;
    }

    /**
     * Generate JWT token for a user
     *
     * @param email User's email (used as subject)
     * @param role  User's role (stored as claim)
     * @return Signed JWT token string
     */
    public String generateToken(String email, String role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }

    /**
     * Extract the email (subject) from the token
     *
     * @param token JWT token string
     * @return Email/subject if valid, null otherwise
     */
    public String extractEmail(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .getSubject();
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Extract the role claim from the token
     *
     * @param token JWT token string
     * @return Role string if present and valid, null otherwise
     */
    public String extractRole(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .get("role", String.class);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Validate token signature and expiration
     *
     * @param token JWT token string
     * @return true if token is valid (not expired, signature correct), false otherwise
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (MalformedJwtException e) {
            System.out.println("Invalid JWT token: Malformed");
        } catch (ExpiredJwtException e) {
            System.out.println("JWT token expired");
        } catch (UnsupportedJwtException e) {
            System.out.println("Unsupported JWT token");
        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims string is empty");
        } catch (Exception e) {
            System.out.println("JWT validation failed: " + e.getMessage());
        }
        return false;
    }
}