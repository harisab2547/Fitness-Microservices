package com.fitness.activity.service.dto;

import com.fitness.activity.service.model.ActivityType;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Data
public class ActivityRequest {

    private String id;
    private ActivityType activityType;
    private Integer duration;
    private Integer calaoriesBurned;
    private LocalDateTime startTime;
    private Map<String,Object> additionalMetrics;



}
