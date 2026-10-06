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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<HttpStatus> register(@Valid @RequestBody RegisterRequest request) {
        try{
            authService.register(request);
        }catch(IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/login")
    public ResponseEntity<HttpStatus> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        authService.login(request, httpRequest);

        return ResponseEntity.status(HttpStatus.OK).build();
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
}