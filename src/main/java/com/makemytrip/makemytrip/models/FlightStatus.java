package com.makemytrip.makemytrip.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "flight_status")
public class FlightStatus {

    @Id
    private String id;

    private String flightId;
    private String status;         // Boarding / On Time / Delayed / Departed etc.
    private String reason;         // Weather / Technical / Congestion etc.
    private String eta;            // Estimated arrival time
    private String etd;            // Estimated departure time
    private String lastUpdated;    // Timestamp
}
