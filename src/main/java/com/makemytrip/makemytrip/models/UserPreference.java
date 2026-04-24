package com.makemytrip.makemytrip.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user_preferences")
public class UserPreference {

    @Id
    private String id;

    private String userId;
    private String preferredLocation; // beach, mountain, city
    private String preferredBudget;

    public String getUserId() { return userId; }
    public String getPreferredLocation() { return preferredLocation; }
    public String getPreferredBudget() { return preferredBudget; }

    public void setUserId(String userId) { this.userId = userId; }
    public void setPreferredLocation(String preferredLocation) { this.preferredLocation = preferredLocation; }
    public void setPreferredBudget(String preferredBudget) { this.preferredBudget = preferredBudget; }
}