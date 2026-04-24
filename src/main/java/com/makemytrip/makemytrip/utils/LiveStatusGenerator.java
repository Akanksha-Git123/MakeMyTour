package com.makemytrip.makemytrip.utils;

import com.makemytrip.makemytrip.models.FlightStatus;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

@Component
public class LiveStatusGenerator {

    private static final String[] STATUSES = {"On Time", "Delayed", "Boarding", "Departed"};
    private static final String[] REASONS = {"Weather", "Technical Issue", "Air Traffic", "Security Check"};

    private Random random = new Random();

    public FlightStatus generate(String flightId) {
        FlightStatus s = new FlightStatus();
        s.setFlightId(flightId);

        s.setStatus(STATUSES[random.nextInt(STATUSES.length)]);
        s.setReason(REASONS[random.nextInt(REASONS.length)]);

        s.setEtd(LocalDateTime.now().plusMinutes(30).format(DateTimeFormatter.ISO_LOCAL_TIME));
        s.setEta(LocalDateTime.now().plusHours(2).format(DateTimeFormatter.ISO_LOCAL_TIME));

        s.setLastUpdated(LocalDateTime.now().toString());
        return s;
    }
}
