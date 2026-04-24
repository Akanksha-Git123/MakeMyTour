package com.makemytrip.makemytrip.models;

import lombok.Data;

@Data
public class FlightStatusResponse {
    private String flightNumber;
    private String airline;
    private String from;
    private String to;
    private String status;
    private String departure;
    private String arrival;
    private String revisedDeparture;
    private String revisedArrival;
}
