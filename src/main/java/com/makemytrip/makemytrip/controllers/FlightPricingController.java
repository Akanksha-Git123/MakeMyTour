package com.makemytrip.makemytrip.controllers;

import com.makemytrip.makemytrip.models.Flight;
import com.makemytrip.makemytrip.repositories.FlightRepository;
import com.makemytrip.makemytrip.services.DynamicPricingService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")   // keep same base
@CrossOrigin("*")
public class FlightPricingController {

    private final DynamicPricingService service;
    private final FlightRepository flightRepository;

    public FlightPricingController(
            DynamicPricingService service,
            FlightRepository flightRepository
    ) {
        this.service = service;
        this.flightRepository = flightRepository;
    }

    // ✅ FIXED: GET ALL FLIGHTS
    @GetMapping("/flights")
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    // ✅ DYNAMIC PRICE
    @GetMapping("/pricing/{flightId}")
    public Map<String, Object> getPrice(@PathVariable String flightId) {
        return service.calculatePrice(flightId);
    }

    // ✅ PRICE HISTORY
    @GetMapping("/pricing/history/{flightId}")
    public Object history(@PathVariable String flightId) {
        return service.getPriceHistory(flightId);
    }

    // ✅ FREEZE PRICE
    @PostMapping("/pricing/freeze/{flightId}")
    public Map<String, Object> freeze(@PathVariable String flightId) {

        Map<String, Object> response = service.freezePrice(flightId);

        // ✅ Ensure message ALWAYS exists
        if (!response.containsKey("message")) {
            response.put("message", "✅ Price frozen successfully for flight " + flightId);
        }

        return response;
    }
}