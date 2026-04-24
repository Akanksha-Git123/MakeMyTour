package com.makemytrip.makemytrip.controllers;

import com.makemytrip.makemytrip.services.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin("*")
public class NotificationController {

    private final NotificationService service;

    public NotificationController(NotificationService service) {
        this.service = service;
    }

    @PostMapping("/send")
    public Map<String, String> send(
            @RequestParam String userId,
            @RequestParam String message) {

        return service.sendNotification(userId, message);
    }

    @GetMapping("/{userId}")
    public List<Map<String, String>> getUserNotifications(@PathVariable String userId) {
        return service.getUserNotifications(userId);
    }
}