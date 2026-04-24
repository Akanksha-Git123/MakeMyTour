package com.makemytrip.makemytrip.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.makemytrip.makemytrip.models.Feedback;

public interface FeedbackRepository extends MongoRepository<Feedback,String> {
}