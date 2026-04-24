package com.makemytrip.makemytrip.services;

import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.*;

@Service
public class NotificationService {

    private final Map<String, List<Map<String, String>>> userNotifications = new HashMap<>();

    public Map<String, String> sendNotification(String userId, String message) {

        Map<String, String> notification = new HashMap<>();
        notification.put("id", UUID.randomUUID().toString());
        notification.put("type", "INFO");
        notification.put("message", message);
        notification.put("time", new Date().toString());

        userNotifications
                .computeIfAbsent(userId, k -> new ArrayList<>())
                .add(0, notification);

        return notification;
    }

    public List<Map<String, String>> getUserNotifications(String userId) {
        return userNotifications.getOrDefault(userId, new ArrayList<>());
    }

    // ✅ default notification
    @PostConstruct
    public void init() {
        sendNotification("user123", "Welcome to MakeMyTour ✈️");
    }
}