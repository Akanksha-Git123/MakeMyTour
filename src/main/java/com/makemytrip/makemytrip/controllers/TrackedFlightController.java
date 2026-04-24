package com.makemytrip.makemytrip.controllers;

import com.makemytrip.makemytrip.models.TrackedFlight;
import com.makemytrip.makemytrip.repositories.TrackedFlightRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/track")
@CrossOrigin(origins = "*") // optional but useful
public class TrackedFlightController {

    @Autowired
    private TrackedFlightRepository repo;

    // ✅ Save tracked flight
    @PostMapping
    public TrackedFlight track(@RequestBody TrackedFlight flight) {
        return repo.save(flight);
    }

    // ✅ Get all tracked flights of user
    @GetMapping("/{userId}")
    public List<TrackedFlight> getUserFlights(@PathVariable Long userId) {
        return repo.findByUserId(userId);
    }
}