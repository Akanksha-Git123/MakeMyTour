package com.makemytrip.makemytrip.repositories;

import com.makemytrip.makemytrip.models.Cancellation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CancellationRepository extends MongoRepository<Cancellation, String> {

    Cancellation findByBookingId(String bookingId);
}