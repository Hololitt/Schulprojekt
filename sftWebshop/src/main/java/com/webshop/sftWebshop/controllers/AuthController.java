package com.webshop.sftWebshop.controllers;

import com.webshop.sftWebshop.DTOs.LoginRequest;
import com.webshop.sftWebshop.DTOs.RegisterRequest;
import com.webshop.sftWebshop.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<HttpStatus> register(@Valid @RequestBody RegisterRequest request) {
        try {
            authService.register(request);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/login")
    public ResponseEntity<HttpStatus> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        try {
            authService.login(request, httpRequest);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<HttpStatus> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        SecurityContextHolder.clearContext();

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/check")
    public ResponseEntity<?> getCurrentUser(
            @AuthenticationPrincipal UserDetails userDetails) {

        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(userDetails);
    }
}