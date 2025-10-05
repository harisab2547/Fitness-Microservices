package com.fitness.userservices.userservices.repo;

import com.fitness.userservices.userservices.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {


    boolean existsByEmail(@NotBlank(message = "Email is required") @Email(message = "invalid email format") String email);
}
