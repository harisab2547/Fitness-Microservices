package com.fitness.userservices.userservices.controller;

import com.fitness.userservices.userservices.dto.RegisterRequest;
import com.fitness.userservices.userservices.dto.UserResponse;
import com.fitness.userservices.userservices.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {

    private UserService userService;


    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserProfile(@PathVariable String userId) {

        return ResponseEntity.ok(userService.getUserProfile(userId));

    }

 @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {

        return ResponseEntity.ok(userService.register(request));

    }


}
