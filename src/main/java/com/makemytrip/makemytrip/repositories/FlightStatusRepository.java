package com.makemytrip.makemytrip.repositories;

import com.makemytrip.makemytrip.models.FlightStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface FlightStatusRepository extends MongoRepository<FlightStatus, String> {
    List<FlightStatus> findByFlightIdOrderByLastUpdatedDesc(String flightId);
}
