package com.makemytrip.makemytrip.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "trackedFlights")
public class TrackedFlight {

    @Id
    private String id;

    private Long userId;
    private Long flightId;

    // getters setters

    public String getId() { return id; }

    public Long getUserId() { return userId; }

    public Long getFlightId() { return flightId; }

    public void setId(String id) { this.id = id; }

    public void setUserId(Long userId) { this.userId = userId; }

    public void setFlightId(Long flightId) { this.flightId = flightId; }
}