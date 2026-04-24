package com.makemytrip.makemytrip.services;

import org.json.JSONObject;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class FlightSchedulerService {

    private final TrackedFlightService trackedFlightService;
    private final FlightRealTimeService flightRealTimeService;
    private final LiveFlightPushService pushService;
    private final FlightAlertService alertService;

    public FlightSchedulerService(
            TrackedFlightService trackedFlightService,
            FlightRealTimeService flightRealTimeService,
            LiveFlightPushService pushService,
            FlightAlertService alertService
    ) {
        this.trackedFlightService = trackedFlightService;
        this.flightRealTimeService = flightRealTimeService;
        this.pushService = pushService;
        this.alertService = alertService;
    }

    @Scheduled(fixedRate = 10000)
    public void pushTrackedFlightUpdates() {

        for (String flightCode : trackedFlightService.getTrackedFlights()) {

            JSONObject data = flightRealTimeService.getSmartFlightStatus(flightCode);

            if (data != null && !data.has("error")) {

                // NEW: Send only meaningful alerts
                if (alertService.shouldSendAlert(data)) {
                    pushService.pushUpdate(flightCode, data);
                }
            }
        }
    }
}