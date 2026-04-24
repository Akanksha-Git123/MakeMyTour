package com.makemytrip.makemytrip.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.makemytrip.makemytrip.models.Feedback;
import com.makemytrip.makemytrip.models.UserPreference;
import com.makemytrip.makemytrip.repositories.FeedbackRepository;
import com.makemytrip.makemytrip.repositories.UserPreferenceRepository;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin("*")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserPreferenceRepository preferenceRepository;

    @PostMapping
    public void saveFeedback(@RequestBody Feedback feedback){

        feedbackRepository.save(feedback);

        // Improve recommendation
        if(!feedback.isHelpful()){
            UserPreference pref = preferenceRepository.findByUserId(feedback.getUserId());
            if(pref != null){
                pref.setPreferredLocation("city");
                preferenceRepository.save(pref);
            }
        }
    }
}