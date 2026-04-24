package com.makemytrip.makemytrip.controllers;

import com.makemytrip.makemytrip.models.Booking;
import com.makemytrip.makemytrip.models.Cancellation;
import com.makemytrip.makemytrip.repositories.BookingRepository;
import com.makemytrip.makemytrip.repositories.CancellationRepository;
import com.makemytrip.makemytrip.services.BookingService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    private final BookingRepository bookingRepository;
    private final CancellationRepository cancellationRepository;
    private final BookingService bookingService;

    public BookingController(BookingRepository bookingRepository,
                             CancellationRepository cancellationRepository,
                             BookingService bookingService) {
        this.bookingRepository = bookingRepository;
        this.cancellationRepository = cancellationRepository;
        this.bookingService = bookingService;
    }

    // ✅ CREATE BOOKING
    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestBody Booking request) {

        Booking booking = new Booking(
                request.getFlightId(),
                request.getUserEmail(),
                request.getBookingAmount()
        );

        booking.setAirline(request.getAirline());
        booking.setFromCity(request.getFromCity());
        booking.setToCity(request.getToCity());

        return ResponseEntity.ok(bookingRepository.save(booking));
    }

    // ✅ CANCEL BOOKING (CLEAN + SERVICE USED)
    @PutMapping("/cancel/{id}")
    public ResponseEntity<?> cancelBooking(
            @PathVariable String id,
            @RequestBody Cancellation request
    ) {
        Optional<Booking> optionalBooking = bookingRepository.findById(id);

        if (optionalBooking.isEmpty()) {
            return ResponseEntity.status(404).body("Booking not found");
        }

        Booking booking = optionalBooking.get();

        // 🔥 use service logic
        Booking updatedBooking = bookingService.cancelBooking(booking, request.getReason());

        // 🔥 save cancellation log (optional)
        Cancellation cancel = new Cancellation();
        cancel.setBookingId(id);
        cancel.setReason(request.getReason());
        cancel.setRefundAmount(updatedBooking.getRefundAmount());
        cancel.setRefundStatus(updatedBooking.getRefundStatus());
        cancel.setCancelledAt(LocalDateTime.now().toString());

        cancellationRepository.save(cancel);

        return ResponseEntity.ok(updatedBooking);
    }

    // ✅ REFUND STATUS
    @GetMapping("/refund-status/{bookingId}")
    public ResponseEntity<?> getRefund(@PathVariable String bookingId) {
        Cancellation cancel = cancellationRepository.findByBookingId(bookingId);

        if (cancel == null) {
            return ResponseEntity.status(404).body("No refund entry found");
        }

        return ResponseEntity.ok(cancel);
    }

    // ✅ GET USER BOOKINGS
    @GetMapping("/user/{email}")
    public ResponseEntity<?> getUserBookings(@PathVariable String email) {
        return ResponseEntity.ok(bookingRepository.findByUserEmail(email));
    }
}