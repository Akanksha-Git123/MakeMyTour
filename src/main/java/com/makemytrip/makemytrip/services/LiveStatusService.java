package com.makemytrip.makemytrip.services;

import com.makemytrip.makemytrip.models.FlightStatus;
import com.makemytrip.makemytrip.repositories.FlightStatusRepository;
import com.makemytrip.makemytrip.utils.LiveStatusGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LiveStatusService {

    @Autowired
    private FlightStatusRepository repo;

    @Autowired
    private LiveStatusGenerator generator;

    public FlightStatus getLiveStatus(String flightId) {
        FlightStatus status = generator.generate(flightId);
        repo.save(status);
        return status;
    }

    public List<FlightStatus> getHistory(String flightId) {
        return repo.findByFlightIdOrderByLastUpdatedDesc(flightId);
    }
}
