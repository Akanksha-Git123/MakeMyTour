package com.makemytrip.makemytrip.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.makemytrip.makemytrip.models.Hotel;
import com.makemytrip.makemytrip.models.UserPreference;
import com.makemytrip.makemytrip.repositories.HotelRepository;
import com.makemytrip.makemytrip.repositories.UserPreferenceRepository;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin("*")
public class RecommendationController {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private UserPreferenceRepository preferenceRepository;

    @GetMapping("/{userId}")
    public Map<String,Object> getRecommendations(@PathVariable String userId){

        UserPreference pref = preferenceRepository.findByUserId(userId);

        List<Hotel> hotels;
        String reason;

        if(pref == null){
            hotels = hotelRepository.findAll();
            reason = "Showing popular hotels";
        }
        else if("beach".equalsIgnoreCase(pref.getPreferredLocation())){
            hotels = hotelRepository.findByLocationIgnoreCase("Goa");
            reason = "You liked beach destinations 🌴";
        }
        else if("mountain".equalsIgnoreCase(pref.getPreferredLocation())){
            hotels = hotelRepository.findByLocationIgnoreCase("Manali");
            reason = "You prefer mountain trips 🏔";
        }
        else{
            hotels = hotelRepository.findAll();
            reason = "Recommended for you";
        }

        Map<String,Object> response = new HashMap<>();
        response.put("hotels", hotels);
        response.put("reason", reason);

        return response;
    }
}