package com.webshop.sftWebshop.services;

import com.webshop.sftWebshop.DTOs.LoginRequest;
import com.webshop.sftWebshop.DTOs.RegisterRequest;
import com.webshop.sftWebshop.models.User;
import com.webshop.sftWebshop.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email()) || userRepository.existsByUsername(request.username())) {
            throw new IllegalArgumentException("Email or username already in use");
        }else{
            User user = User.builder()
                    .email(request.email())
                    .username(request.username())
                    .name(request.name())
                    .surname(request.surname())
                    .password(passwordEncoder.encode(request.password()))
                    .build();

            userRepository.save(user);
        }
    }

    public void login(LoginRequest request, HttpServletRequest httpRequest) {
        if(!userRepository.existsByEmail(request.email())){
            throw new RuntimeException("E-Mail oder Kennwort ist falsch.");
        }

        User user = userRepository.findUserByEmail(request.email()).get();

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("E-Mail oder Kennwort ist falsch.");
        }

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(request.email(), request.password());

        Authentication authentication = authenticationManager.authenticate(authToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        HttpSession session = httpRequest.getSession(true);
        session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
    }
}