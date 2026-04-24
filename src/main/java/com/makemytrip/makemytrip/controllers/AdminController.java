package com.makemytrip.makemytrip.controllers;

import com.makemytrip.makemytrip.models.Users;
import com.makemytrip.makemytrip.models.Flight;
import com.makemytrip.makemytrip.models.Hotel;
import com.makemytrip.makemytrip.repositories.UserRepository;
import com.makemytrip.makemytrip.repositories.FlightRepository;
import com.makemytrip.makemytrip.repositories.HotelRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FlightRepository flightRepository;

    @Autowired
    private HotelRepository hotelRepository;

    // --------------------------
    //  GET ALL USERS
    // --------------------------
    @GetMapping("/users")
    public ResponseEntity<List<Users>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    // --------------------------
    //  ADD NEW FLIGHT
    // --------------------------
    @PostMapping("/flight")
    public Flight addFlight(@RequestBody Flight flight) {
        return flightRepository.save(flight);
    }

    // --------------------------
    //  ADD NEW HOTEL
    // --------------------------
    @PostMapping("/hotel")
    public Hotel addHotel(@RequestBody Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    // --------------------------
    //  UPDATE FLIGHT
    // --------------------------
    @PutMapping("/flight/{id}")
    public ResponseEntity<Flight> updateFlight(
            @PathVariable String id,
            @RequestBody Flight updatedFlight
    ) {
        Optional<Flight> optional = flightRepository.findById(id);

        if (optional.isEmpty()) return ResponseEntity.notFound().build();

        Flight flight = optional.get();

        flight.setFlightNumber(updatedFlight.getFlightNumber());
        flight.setAirline(updatedFlight.getAirline());
        flight.setFromCity(updatedFlight.getFromCity());
        flight.setToCity(updatedFlight.getToCity());
        flight.setScheduledDeparture(updatedFlight.getScheduledDeparture());
        flight.setScheduledArrival(updatedFlight.getScheduledArrival());
        flight.setRevisedDeparture(updatedFlight.getRevisedDeparture());
        flight.setRevisedArrival(updatedFlight.getRevisedArrival());
        flight.setStatus(updatedFlight.getStatus());
        flight.setAvailableSeats(updatedFlight.getAvailableSeats());

        flightRepository.save(flight);
        return ResponseEntity.ok(flight);
    }

    // --------------------------
    //  UPDATE HOTEL
    // --------------------------
    @PutMapping("/hotel/{id}")
    public ResponseEntity<Hotel> updateHotel(
            @PathVariable String id,
            @RequestBody Hotel updatedHotel
    ) {
        Optional<Hotel> optional = hotelRepository.findById(id);

        if (optional.isEmpty()) return ResponseEntity.notFound().build();

        Hotel hotel = optional.get();

        hotel.setHotelName(updatedHotel.getHotelName());
        hotel.setLocation(updatedHotel.getLocation());
        hotel.setPricePerNight(updatedHotel.getPricePerNight());
        hotel.setAvailableRooms(updatedHotel.getAvailableRooms());
        hotel.setAmenities(updatedHotel.getAmenities());
        hotel.setImageUrl(updatedHotel.getImageUrl());
        hotel.setDescription(updatedHotel.getDescription());

        hotelRepository.save(hotel);
        return ResponseEntity.ok(hotel);
    }

    // --------------------------
    //  DELETE HOTEL  ⭐ FIXED
    // --------------------------
    @DeleteMapping("/hotel/{id}")
    public ResponseEntity<String> deleteHotel(@PathVariable String id) {

        if (!hotelRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        hotelRepository.deleteById(id);
        return ResponseEntity.ok("Hotel deleted successfully");
    }
}