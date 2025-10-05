package com.fitness.userservices.userservices.dto;

import com.fitness.userservices.userservices.model.UserRole;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
public class UserResponse {

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private UserRole role = UserRole.USER;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;





}
