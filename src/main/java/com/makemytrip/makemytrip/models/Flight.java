package com.makemytrip.makemytrip.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "flights")
public class Flight {
    
    @Id
    private String id;

    private String flightNumber;
    private String airline;

    // IMPORTANT — these fields must match MongoDB
    private String fromCity;
    private String toCity;

    private String scheduledDeparture;
    private String scheduledArrival;

    private String revisedDeparture;
    private String revisedArrival;

    private String status;

    // Add this to fix the BookingService error:
    private int availableSeats;  
}
