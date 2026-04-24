package com.makemytrip.makemytrip.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "recommendation_feedback")
public class Feedback {

    @Id
    private String id;

    private String userId;
    private String hotelId;
    private boolean helpful;

    public String getUserId() { return userId; }
    public String getHotelId() { return hotelId; }
    public boolean isHelpful() { return helpful; }

    public void setUserId(String userId) { this.userId = userId; }
    public void setHotelId(String hotelId) { this.hotelId = hotelId; }
    public void setHelpful(boolean helpful) { this.helpful = helpful; }
}