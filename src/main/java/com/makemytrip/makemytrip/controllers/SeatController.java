package com.makemytrip.makemytrip.controllers;

import com.makemytrip.makemytrip.models.Seat;
import com.makemytrip.makemytrip.repositories.SeatRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")   // ✅ FIXED (important)
@CrossOrigin("*")
public class SeatController {

    private final SeatRepository seatRepo;

    public SeatController(SeatRepository seatRepo) {
        this.seatRepo = seatRepo;
    }

    // ✅ GET seats by flight
    @GetMapping("/{flightId}")
    public List<Seat> getSeats(@PathVariable String flightId) {
        return seatRepo.findByFlightId(flightId);
    }

    // ✅ SELECT / BOOK seat (SAFE VERSION)
    @PutMapping("/book/{seatId}")
    public Seat bookSeat(@PathVariable String seatId) {

        Seat seat = seatRepo.findById(seatId)
                .orElseThrow(() -> new RuntimeException("Seat not found"));

        // 🚨 IMPORTANT: prevent double booking
        if (seat.isBooked()) {
            throw new RuntimeException("Seat already booked!");
        }

        seat.setBooked(true);

        return seatRepo.save(seat);
    }
}