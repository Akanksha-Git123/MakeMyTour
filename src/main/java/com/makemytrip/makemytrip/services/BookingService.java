package com.makemytrip.makemytrip.services;

import com.makemytrip.makemytrip.models.Booking;
import com.makemytrip.makemytrip.repositories.BookingRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // ✅ CREATE BOOKING
    public Booking createBooking(String flightId, String email, double amount) {
        Booking booking = new Booking(flightId, email, amount);
        return bookingRepository.save(booking);
    }

    // ✅ CALCULATE REFUND (Reusable Logic)
    public double calculateRefund(Booking booking) {
        long hours = Duration.between(
                booking.getBookingTime(),
                LocalDateTime.now()
        ).toHours();

        if (hours <= 24) {
            return booking.getBookingAmount() * 0.5; // 50%
        } else {
            return booking.getBookingAmount() * 0.25; // after 24 hrs
        }
    }

    // ✅ CANCEL BOOKING
    public Booking cancelBooking(Booking booking, String reason) {

        if (booking.isCancelled()) {
            throw new RuntimeException("Already cancelled");
        }

        booking.setCancelled(true);
        booking.setCancellationReason(reason);
        booking.setCancelledAt(LocalDateTime.now().toString());

        double refund = calculateRefund(booking);

        booking.setRefundAmount(refund);
        booking.setRefundStatus("PENDING");

        return bookingRepository.save(booking);
    }

    // ✅ GET USER BOOKINGS
    public List<Booking> getUserBookings(String email) {
        return bookingRepository.findByUserEmail(email);
    }

    // ✅ GET REFUND STATUS
    public Booking getRefundStatus(String bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }
}