package com.makemytrip.makemytrip.controllers;

import com.makemytrip.makemytrip.models.Room;
import com.makemytrip.makemytrip.repositories.RoomRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")   // FIXED
@CrossOrigin("*")
public class RoomController {

    private final RoomRepository roomRepo;

    public RoomController(RoomRepository roomRepo) {
        this.roomRepo = roomRepo;
    }

    @GetMapping("/{hotelId}")
    public List<Room> getRooms(@PathVariable String hotelId) {
        return roomRepo.findByHotelId(hotelId);
    }
    @PostMapping
    public Room addRoom(@RequestBody Room room) {
        return roomRepo.save(room);
    }
}