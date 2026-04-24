package com.makemytrip.makemytrip.controllers;

import com.makemytrip.makemytrip.models.PriceHistory;
import com.makemytrip.makemytrip.services.PriceHistoryService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/price-history")
@CrossOrigin("*")
public class PriceHistoryController {

    private final PriceHistoryService service;

    public PriceHistoryController(PriceHistoryService service) {
        this.service = service;
    }

    @PostMapping
    public PriceHistory save(@RequestParam String flightId,
                             @RequestParam double price) {
        return service.savePrice(flightId, price);
    }

    @GetMapping("/{flightId}")
    public List<PriceHistory> get(@PathVariable String flightId) {
        return service.getHistory(flightId);
    }
}