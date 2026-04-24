package com.makemytrip.makemytrip.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.makemytrip.makemytrip.models.UserPreference;

public interface UserPreferenceRepository extends MongoRepository<UserPreference,String> {
    UserPreference findByUserId(String userId);
}