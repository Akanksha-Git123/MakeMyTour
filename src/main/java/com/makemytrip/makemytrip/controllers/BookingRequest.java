package com.makemytrip.makemytrip.controllers;

public class BookingRequest {

    private String flightId;
    private String userEmail;
    private double amount;

    public String getFlightId() {
        return flightId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public double getAmount() {
        return amount;
    }
}
