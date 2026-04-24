package com.makemytrip.makemytrip.services;

import com.makemytrip.makemytrip.models.FlightStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class MockFlightStatusService {

    private final List<String> statuses = Arrays.asList(
            "On Time", "Delayed by 1h", "Boarding", "Departed", "Landed"
    );

    private final List<String> reasons = Arrays.asList(
            "Weather issue", "Technical inspection", "ATC congestion"
    );

    @Autowired
    private NotificationService notificationService;

    public FlightStatus getMockStatus(String flightCode) {

        Random random = new Random();

        String status = statuses.get(random.nextInt(statuses.size()));
        String reason = reasons.get(random.nextInt(reasons.size()));

        LocalDateTime now = LocalDateTime.now();

        FlightStatus fs = new FlightStatus();
        fs.setFlightId(flightCode);
        fs.setStatus(status);
        fs.setReason(reason);
        fs.setEtd(now.plusMinutes(30).toString());
        fs.setEta(now.plusHours(2).toString());
        fs.setLastUpdated(now.toString());

        // 🔔 AUTO NOTIFICATION
        notificationService.sendNotification(
                "user123",
                "Flight " + flightCode + " is " + status + " (" + reason + ")"
        );

        return fs;
    }
}