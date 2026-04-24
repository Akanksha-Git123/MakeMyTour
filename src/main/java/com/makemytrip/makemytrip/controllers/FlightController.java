package com.makemytrip.makemytrip.controllers;

import com.makemytrip.makemytrip.services.FlightRealTimeService;
import com.makemytrip.makemytrip.services.TrackedFlightService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/live")
@CrossOrigin("*")
public class FlightController {

    private final FlightRealTimeService service;
    private final TrackedFlightService trackedService;

    public FlightController(
            FlightRealTimeService service,
            TrackedFlightService trackedService
    ) {
        this.service = service;
        this.trackedService = trackedService;
    }

    // SMART STATUS (UNCHANGED)
    @GetMapping("/status/{flightCode}")
    public String getStatus(@PathVariable String flightCode) {
        JSONObject result = service.getSmartFlightStatus(flightCode);
        return result.toString();
    }

    // REAL LIVE SEARCH (UNCHANGED)
    @GetMapping("/search")
    public String searchFlights(
            @RequestParam String from,
            @RequestParam String to
    ) {
        JSONArray flights = service.getRealFlights(from, to);
        return flights.toString();
    }

    // MOCK STATUS (UNCHANGED)
    @GetMapping("/mock-status/{code}")
    public String mockStatus(@PathVariable String code) {
        return service.getMockStatus(code).toString();
    }

    // NEW: TRACK FLIGHT
    @PostMapping("/track/{flightCode}")
    public String trackFlight(@PathVariable String flightCode) {
        trackedService.trackFlight(flightCode);
        return "Tracking enabled for " + flightCode;
    }

    // NEW: UNTRACK FLIGHT
    @DeleteMapping("/track/{flightCode}")
    public String untrackFlight(@PathVariable String flightCode) {
        trackedService.untrackFlight(flightCode);
        return "Tracking disabled for " + flightCode;
    }

    // NEW: GET TRACKED FLIGHTS
    @GetMapping("/tracked")
    public Set<String> getTrackedFlights() {
        return trackedService.getTrackedFlights();
    }
}
