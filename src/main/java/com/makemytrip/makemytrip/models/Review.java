package com.makemytrip.makemytrip.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection="reviews")
public class Review {

    @Id
    private String id;

    private String hotelId;
    private String userName;   // NEW FIELD
    private int rating;
    private String comment;
    private Date createdAt = new Date();

    public String getId() {
        return id;
    }

    public String getHotelId() {
        return hotelId;
    }

    public String getUserName() {
        return userName;
    }

    public int getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setHotelId(String hotelId) {
        this.hotelId = hotelId;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}