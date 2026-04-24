package com.makemytrip.makemytrip.repositories;

import com.makemytrip.makemytrip.models.TrackedFlight;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TrackedFlightRepository extends MongoRepository<TrackedFlight, String> {

    List<TrackedFlight> findByUserId(Long userId);
}