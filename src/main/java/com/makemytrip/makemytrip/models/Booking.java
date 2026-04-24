package com.makemytrip.makemytrip.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "bookings")
public class Booking {

    @Id
    private String id;

    private String flightId;
    private String userEmail;
    private double bookingAmount;

    private boolean cancelled;
    private String cancellationReason;
    private double refundAmount;
    private String refundStatus;
    private String cancelledAt;

    private LocalDateTime bookingTime;

    // 🔥 NEW FIELDS (for UI)
    private String airline;
    private String fromCity;
    private String toCity;

    public Booking() {}

    public Booking(String flightId, String userEmail, double bookingAmount) {
        this.flightId = flightId;
        this.userEmail = userEmail;
        this.bookingAmount = bookingAmount;
        this.bookingTime = LocalDateTime.now();
        this.cancelled = false;
        this.refundStatus = "NOT_REQUESTED";
        this.refundAmount = 0;
    }

    // GETTERS
    public String getId() { return id; }
    public String getFlightId() { return flightId; }
    public String getUserEmail() { return userEmail; }
    public double getBookingAmount() { return bookingAmount; }
    public boolean isCancelled() { return cancelled; }
    public String getCancellationReason() { return cancellationReason; }
    public double getRefundAmount() { return refundAmount; }
    public String getRefundStatus() { return refundStatus; }
    public String getCancelledAt() { return cancelledAt; }
    public LocalDateTime getBookingTime() { return bookingTime; }

    public String getAirline() { return airline; }
    public String getFromCity() { return fromCity; }
    public String getToCity() { return toCity; }

    // SETTERS
    public void setId(String id) { this.id = id; }
    public void setFlightId(String flightId) { this.flightId = flightId; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public void setBookingAmount(double bookingAmount) { this.bookingAmount = bookingAmount; }
    public void setCancelled(boolean cancelled) { this.cancelled = cancelled; }
    public void setCancellationReason(String cancellationReason) { this.cancellationReason = cancellationReason; }
    public void setRefundAmount(double refundAmount) { this.refundAmount = refundAmount; }
    public void setRefundStatus(String refundStatus) { this.refundStatus = refundStatus; }
    public void setCancelledAt(String cancelledAt) { this.cancelledAt = cancelledAt; }
    public void setBookingTime(LocalDateTime bookingTime) { this.bookingTime = bookingTime; }

    public void setAirline(String airline) { this.airline = airline; }
    public void setFromCity(String fromCity) { this.fromCity = fromCity; }
    public void setToCity(String toCity) { this.toCity = toCity; }
}