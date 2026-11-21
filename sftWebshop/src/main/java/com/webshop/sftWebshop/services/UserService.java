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


    public UserSearchResponse findUserByUserId(Integer userId){
        Optional<User> optionalUser = userRepository.findById(userId);

        return handleOptionalUser(optionalUser);
    }

    public Optional<User> findUserByEmail(String email){
        return userRepository.findUserByEmail(email);
    }

    private UserSearchResponse handleOptionalUser(Optional<User> optionalUser){
        return optionalUser.map(user -> new UserSearchResponse(true, user)).orElseGet(() -> new UserSearchResponse(false, null));

    }
}
