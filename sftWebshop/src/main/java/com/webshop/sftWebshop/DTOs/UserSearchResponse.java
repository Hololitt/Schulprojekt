package com.webshop.sftWebshop.DTOs;

import com.webshop.sftWebshop.models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserSearchResponse {
    private boolean isFound;
    private User user;
}
