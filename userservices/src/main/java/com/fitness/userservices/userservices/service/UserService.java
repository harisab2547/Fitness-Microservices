package com.fitness.userservices.userservices.service;

import com.fitness.userservices.userservices.dto.RegisterRequest;
import com.fitness.userservices.userservices.dto.UserResponse;
import com.fitness.userservices.userservices.model.User;
import com.fitness.userservices.userservices.repo.UserRepository;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already exists");
        }


        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        User savedUsed = userRepository.save(user);
        UserResponse userResponse = new UserResponse();
        userResponse.setId(savedUsed.getId());
        userResponse.setEmail(savedUsed.getEmail());
        userResponse.setFirstName(savedUsed.getFirstName());
        userResponse.setLastName(savedUsed.getLastName());
        userResponse.setPassword(savedUsed.getPassword());
        userResponse.setCreatedDate(savedUsed.getCreatedDate());
        userResponse.setUpdatedDate(savedUsed.getUpdatedDate());

        return userResponse;


    }

    public UserResponse getUserProfile(String userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setEmail(user.getEmail());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        userResponse.setPassword(user.getPassword());
        userResponse.setCreatedDate(user.getCreatedDate());
        userResponse.setUpdatedDate(user.getUpdatedDate());
        return userResponse;

    }

    public Boolean existByUserId(String userId) {
        return userRepository.existsById(userId);
    }
}
