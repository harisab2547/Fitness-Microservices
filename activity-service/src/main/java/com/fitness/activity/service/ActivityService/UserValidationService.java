package com.fitness.activity.service.ActivityService;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class UserValidationService {

    private final WebClient webClient;

    public UserValidationService(@Qualifier("userServiceWebClient") WebClient webClient) {
        this.webClient = webClient;
    }
    public boolean validateUserId(String userId) {
        try {
            return webClient.get().uri("/api/users/validate" , userId).retrieve().bodyToMono(Boolean.class).block();

        }
        catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }




}
