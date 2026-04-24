package com.makemytrip.makemytrip.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;

    private String userId;
    private String message;
    private String type;

    // ✅ GETTERS

    public String getId() { return id; }

    public String getUserId() { return userId; }

    public String getMessage() { return message; }

    public String getType() { return type; }

    // ✅ SETTERS

    public void setId(String id) { this.id = id; }

    public void setUserId(String userId) { this.userId = userId; }

    public void setMessage(String message) { this.message = message; }

    public void setType(String type) { this.type = type; }
}