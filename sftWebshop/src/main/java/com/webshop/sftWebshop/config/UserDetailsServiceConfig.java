package com.webshop.sftWebshop.config;

import com.webshop.sftWebshop.DTOs.UserSearchResponse;
import com.webshop.sftWebshop.models.User;
import com.webshop.sftWebshop.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
@SuppressWarnings("unused")
public class UserDetailsServiceConfig {
    private final UserService userService;

    @Autowired
    public UserDetailsServiceConfig(UserService userService) {
        this.userService = userService;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            UserSearchResponse response = userService.findUserByUsername(username);

            boolean isFound = response.isFound();

            if (!isFound) {
                throw new UsernameNotFoundException("User not found");
            }
User user = response.getUser();

            return new CustomUserDetails(
                    user.getName(),
                    user.getPassword(),
                    user.getName(),
                    user.getSurname(),
                    user.getEmail(),
                    user.getUserId(),
                    List.of(new SimpleGrantedAuthority("ROLE_USER"))
            );
        };
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}