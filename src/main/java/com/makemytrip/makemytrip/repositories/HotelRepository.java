package com.makemytrip.makemytrip.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.makemytrip.makemytrip.models.Hotel;

@Repository
public interface HotelRepository extends MongoRepository<Hotel, String> {

    List<Hotel> findByLocationIgnoreCase(String location);  // ✅ CORRECT

}