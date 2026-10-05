package com.webshop.sftWebshop.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.nio.file.AccessDeniedException;
import java.util.Objects;

@Component
public class CurrentUserProvider {

    public Integer getUserId() throws AccessDeniedException {
        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        if (auth == null ||
                !auth.isAuthenticated() ||
                Objects.equals(auth.getPrincipal(), "anonymousUser")) {
            throw new AccessDeniedException("User is not authenticated");
        }

        return ((CustomUserDetails) Objects.requireNonNull(auth.getPrincipal())).getUserId();
    }
}