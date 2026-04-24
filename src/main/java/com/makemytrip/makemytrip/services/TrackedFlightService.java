package com.makemytrip.makemytrip.services;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Service
public class TrackedFlightService {

    private final Set<String> trackedFlights = Collections.synchronizedSet(new HashSet<>());

    public void trackFlight(String flightCode) {
        trackedFlights.add(flightCode.toUpperCase());
    }

    public void untrackFlight(String flightCode) {
        trackedFlights.remove(flightCode.toUpperCase());
    }

    public Set<String> getTrackedFlights() {
        return trackedFlights;
    }
}
