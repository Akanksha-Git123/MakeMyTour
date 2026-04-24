package com.makemytrip.makemytrip.services;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class FlightAlertService {

    public boolean shouldSendAlert(JSONObject data) {
        String status = data.optString("mapped_status", "");
        return status.contains("Delayed") || status.contains("Cancelled");
    }
}