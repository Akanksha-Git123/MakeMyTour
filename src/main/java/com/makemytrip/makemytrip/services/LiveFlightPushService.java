package com.makemytrip.makemytrip.services;

import org.json.JSONObject;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class LiveFlightPushService {

    private final SimpMessagingTemplate messagingTemplate;

    public LiveFlightPushService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void pushUpdate(String flightCode, JSONObject data) {
        messagingTemplate.convertAndSend("/topic/flight/" + flightCode, data.toString());
    }
}
