package com.fitness.activity.service.dto;


import com.fitness.activity.service.model.ActivityType;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.Map;

@Data

public class ActivityResponse {


    private String id;
    private String userId;
    private Integer duartion;
    private Integer caloriesburn;
    private ActivityType activityType;
    private LocalDateTime startTime;
    private LocalDateTime createdTime;
    private LocalDateTime updatedTime;
    private Map<String, Object> additionalProperties ;



}
