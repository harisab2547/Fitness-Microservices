package com.fitness.activity.service.ActivityService;

import com.fitness.activity.service.dto.ActivityRequest;
import com.fitness.activity.service.dto.ActivityResponse;
import com.fitness.activity.service.model.Activity;
import com.fitness.activity.service.repo.ActivityRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepo activityRepo;


    public ActivityResponse trackActivity(ActivityRequest activityRequest) {

        Activity activity = Activity.builder()
                .userId(activityRequest.getId())
                .duartion(activityRequest.getDuration())
                .caloriesburn(activityRequest.getCalaoriesBurned())
                .startTime(activityRequest.getStartTime())
                .activityType(activityRequest.getActivityType())
                .createdTime(activityRequest.getStartTime())
                .additionalProperties(activityRequest.getAdditionalMetrics())
                .build();
        Activity savedActivity = activityRepo.save(activity);
        return maptoActivtyResponse(savedActivity);

    }
    private ActivityResponse maptoActivtyResponse(Activity activity) {
        ActivityResponse activityResponse = new ActivityResponse();
        activityResponse.setId(activity.getId());
        activityResponse.setDuartion(activity.getDuartion());
        activityResponse.setActivityType(activity.getActivityType());
        activityResponse.setStartTime(activity.getStartTime());
        activityResponse.setUserId(activity.getUserId());
        activityResponse.setAdditionalProperties(activity.getAdditionalProperties());
        activityResponse.setCreatedTime(activity.getCreatedTime());
        activityResponse.setUpdatedTime(activity.getUpdatedTime());
        return activityResponse;
    }

    public List<ActivityResponse> getUserActivities( String userId) {

        List<Activity> activityList = activityRepo.findByUserId(userId);
        return activityList.stream().map(
                this::maptoActivtyResponse
        ).collect(Collectors.toList());

    }

    public ActivityResponse getActivityById(String activityId) {

        Activity activity = activityRepo.findById(activityId).orElse(null);
        return maptoActivtyResponse(activity);

    }
}
