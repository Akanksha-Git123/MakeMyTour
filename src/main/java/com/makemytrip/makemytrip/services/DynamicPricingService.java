package com.makemytrip.makemytrip.services;

import com.makemytrip.makemytrip.models.PriceHistory;
import com.makemytrip.makemytrip.repositories.PriceHistoryRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.*;

@Service
public class DynamicPricingService {

    private final Map<String, Double> freezeMap = new HashMap<>();
    private final PriceHistoryRepository priceHistoryRepository;

    public DynamicPricingService(PriceHistoryRepository priceHistoryRepository) {
        this.priceHistoryRepository = priceHistoryRepository;
    }

    // ✅ Seasonal multiplier
    private double seasonalMultiplier() {
        Month month = LocalDate.now().getMonth();

        if (month == Month.DECEMBER) return 1.25;
        if (month == Month.MAY || month == Month.JUNE) return 1.20;

        return 1.0;
    }

    // ✅ Weekend multiplier
    private double weekendMultiplier() {
        DayOfWeek day = LocalDate.now().getDayOfWeek();

        if (day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY)
            return 1.10;

        return 1.0;
    }

    // ✅ MAIN: CALCULATE PRICE
    public Map<String, Object> calculatePrice(String flightKey) {

        // If frozen → return same price
        if (freezeMap.containsKey(flightKey)) {
            return Map.of(
                    "price", freezeMap.get(flightKey),
                    "reason", "Price is frozen ❄️"
            );
        }

        double basePrice = 4000 + new Random().nextInt(4000);
        int demandFactor = new Random().nextInt(30);

        double dynamicPrice = basePrice + (basePrice * demandFactor / 100);

        double seasonal = seasonalMultiplier();
        double weekend = weekendMultiplier();

        dynamicPrice = dynamicPrice * seasonal * weekend;

        Map<String, Object> result = new HashMap<>();
        result.put("price", dynamicPrice);
        result.put("reason", "Increased due to demand (" + demandFactor + "%)");
        result.put("seasonalMultiplier", seasonal);
        result.put("weekendMultiplier", weekend);

        // ✅ Save history
        PriceHistory entry = new PriceHistory();
        entry.setFlightId(flightKey);
        entry.setPrice(dynamicPrice);
        entry.setTimestamp(LocalDateTime.now().toString());
        priceHistoryRepository.save(entry);

        return result;
    }

    // ✅ PRICE HISTORY
    public List<Map<String, Object>> getPriceHistory(String flightKey) {

        List<PriceHistory> list = priceHistoryRepository.findByFlightId(flightKey);
        List<Map<String, Object>> response = new ArrayList<>();

        for (PriceHistory entry : list) {
            Map<String, Object> map = new HashMap<>();
            map.put("price", entry.getPrice());
            map.put("timestamp", entry.getTimestamp());
            response.add(map);
        }

        return response;
    }

    // ✅ FREEZE PRICE (ONLY ONE METHOD NOW)
    public Map<String, Object> freezePrice(String flightKey) {

        Map<String, Object> current = calculatePrice(flightKey);
        double price = (double) current.get("price");

        freezeMap.put(flightKey, price);

        return Map.of(
                "message", "✅ Price frozen at ₹" + price + " for 24 hours"
        );
    }
}