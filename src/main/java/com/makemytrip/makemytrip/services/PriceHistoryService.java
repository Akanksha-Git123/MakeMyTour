package com.makemytrip.makemytrip.services;

import com.makemytrip.makemytrip.models.PriceHistory;
import com.makemytrip.makemytrip.repositories.PriceHistoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PriceHistoryService {

    @Autowired
    private PriceHistoryRepository repository;

    // ✅ Save price entry
    public PriceHistory savePrice(String flightId, double price) {
        PriceHistory ph = new PriceHistory();
        ph.setFlightId(flightId);
        ph.setPrice(price);
        ph.setTimestamp(LocalDateTime.now().toString());

        return repository.save(ph);
    }

    // ✅ Get history for flight (for graph)
    public List<PriceHistory> getHistory(String flightId) {
        return repository.findByFlightId(flightId);
    }

    // ✅ Simulate real-time pricing
    public double simulateDynamicPrice(double basePrice) {

        double fluctuation = (Math.random() * 0.2); // up to +20%
        return basePrice + (basePrice * fluctuation);
    }
}