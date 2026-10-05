package com.webshop.sftWebshop.services;

import com.webshop.sftWebshop.DTOs.UserSearchResponse;
import com.webshop.sftWebshop.models.User;
import com.webshop.sftWebshop.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserSearchResponse findUserByUsername(String username){
        Optional<User> optionalUser = userRepository.findUserByUsername(username);

        return handleOptionalUser(optionalUser);
    }

    public UserSearchResponse findUserByUserId(Integer userId){
        Optional<User> optionalUser = userRepository.findById(userId);

        return handleOptionalUser(optionalUser);
    }

    private UserSearchResponse handleOptionalUser(Optional<User> optionalUser){
        return optionalUser.map(user -> new UserSearchResponse(true, user)).orElseGet(() -> new UserSearchResponse(false, null));

    }
}
