package com.distribution.backend.controller;

import com.distribution.backend.dto.AuthResponse;
import com.distribution.backend.dto.LoginRequest;
import com.distribution.backend.dto.RegisterRequest;
import com.distribution.backend.entity.Distributor;
import com.distribution.backend.security.JwtUtil;
import com.distribution.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        authService.registerDistributor(request);
        return ResponseEntity.ok("Registration successful! Await approval from supply division.");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // For simplicity — in real app, load full user details
        String token = jwtUtil.generateToken(request.getEmail(), "DISTRIBUTOR");
        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setRole("DISTRIBUTOR");
        response.setEmail(request.getEmail());

        return ResponseEntity.ok(response);
    }
}