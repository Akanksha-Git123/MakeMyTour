package com.makemytrip.makemytrip.repositories;

import com.makemytrip.makemytrip.models.Flight;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface FlightRepository extends MongoRepository<Flight, String> {

    // MUST MATCH your MongoDB fields: fromCity, toCity
    List<Flight> findByFromCityIgnoreCaseAndToCityIgnoreCase(String fromCity, String toCity);
}
