package com.makemytrip.makemytrip.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.makemytrip.makemytrip.models.Review;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {

    List<Review> findByHotelId(String hotelId);

}