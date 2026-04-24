package com.makemytrip.makemytrip.controllers;

import com.makemytrip.makemytrip.models.Hotel;
import com.makemytrip.makemytrip.repositories.HotelRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class HotelController {

    private final HotelRepository hotelRepo;

    public HotelController(HotelRepository hotelRepo) {
        this.hotelRepo = hotelRepo;
    }

    @GetMapping("/hotels")
    public List<Hotel> getAllHotels() {
        return hotelRepo.findAll();
    }
}