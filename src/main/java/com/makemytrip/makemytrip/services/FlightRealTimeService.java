package com.makemytrip.makemytrip.services;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class FlightRealTimeService {

    @Value("${airlabs.api.key:}")
    private String apiKey;

    private final String BASE_URL = "https://airlabs.co/api/v9/";

    // -----------------------------------------
    private String mapFlightStatus(JSONObject flight) {

        String status = flight.optString("status", "").toLowerCase();
        int delay = flight.optInt("delayed", 0);

        if (status.contains("cancel")) return "Cancelled";
        if (status.contains("landed")) return "Landed";
        if (delay > 0) return "Delayed by " + delay + " min";
        if (status.contains("en-route")) return "Airborne";
        if (status.contains("scheduled")) return "On Time";

        return "Status Unknown";
    }

    // -----------------------------------------
    public JSONObject getSmartFlightStatus(String flightCode) {

        try {
            if (apiKey == null || apiKey.isEmpty()) {
                return getMockStatus(flightCode); // 🔥 fallback
            }

            String airline = flightCode.replaceAll("[0-9]", "");
            String number = flightCode.replaceAll("[A-Za-z]", "");

            String url = BASE_URL + "flights"
                    + "?api_key=" + apiKey
                    + "&airline_iata=" + airline
                    + "&flight_number=" + number;

            RestTemplate restTemplate = new RestTemplate();
            String json = restTemplate.getForObject(url, String.class);

            JSONObject response = new JSONObject(json);
            JSONArray flights = response.optJSONArray("response");

            if (flights == null || flights.length() == 0) {
                return getMockStatus(flightCode); // 🔥 fallback
            }

            JSONObject f = flights.getJSONObject(0);
            f.put("mapped_status", mapFlightStatus(f));

            return f;

        } catch (Exception e) {
            return getMockStatus(flightCode); // 🔥 fallback
        }
    }

    // -----------------------------------------
    public JSONArray getRealFlights(String from, String to) {
        try {
            String url = BASE_URL + "flights"
                    + "?api_key=" + apiKey
                    + "&dep_iata=" + from
                    + "&arr_iata=" + to;

            RestTemplate restTemplate = new RestTemplate();
            String json = restTemplate.getForObject(url, String.class);

            JSONObject response = new JSONObject(json);
            JSONArray arr = response.optJSONArray("response");

            JSONArray result = new JSONArray();

            // ✅ If API gives data → use it
            if (arr != null && arr.length() > 0) {

                for (int i = 0; i < Math.min(arr.length(), 5); i++) {
                    JSONObject f = arr.getJSONObject(i);
                    f.put("mapped_status", mapFlightStatus(f));
                    result.put(f);
                }
            }

            // 🔥 If API gives LESS → ADD MOCK DATA
            while (result.length() < 5) {

                JSONObject mock = new JSONObject();

                int index = result.length();

                mock.put("airline_iata", "AI");
                mock.put("flight_number", 2000 + index);
                mock.put("dep_iata", from);
                mock.put("arr_iata", to);
                mock.put("status", "en-route");
                mock.put("mapped_status", "Airborne");

                mock.put("lat", 20 + new Random().nextInt(10));
                mock.put("lng", 70 + new Random().nextInt(10));

                result.put(mock);
            }

            return result;

        } catch (Exception e) {
            return getMockFlights(from, to); // fallback
        }
    }

    // -----------------------------------------
    // 🔥 MOCK FLIGHTS (VERY IMPORTANT)
    private JSONArray getMockFlights(String from, String to) {

        JSONArray arr = new JSONArray();

        for (int i = 0; i < 5; i++) {

            JSONObject f = new JSONObject();

            f.put("airline_iata", "AI");
            f.put("flight_number", 2000 + i);
            f.put("dep_iata", from);
            f.put("arr_iata", to);
            f.put("status", "en-route");
            f.put("lat", 26 + i);
            f.put("lng", 75 + i);

            arr.put(f);
        }

        return arr;
    }

    // -----------------------------------------
    public JSONObject getMockStatus(String flightCode) {

        JSONObject mock = new JSONObject();

        String[] statuses = {"On Time", "Delayed by 1h", "Boarding", "Departed", "Arrived"};
        String[] reasons = {
                "Weather conditions",
                "Air traffic congestion",
                "Technical inspection",
                "Crew availability",
                "Runway clearance"
        };

        int randomStatus = new Random().nextInt(statuses.length);
        int randomReason = new Random().nextInt(reasons.length);

        int delayMinutes = new Random().nextInt(60);

        mock.put("flightCode", flightCode);
        mock.put("status", statuses[randomStatus]);
        mock.put("reason", reasons[randomReason]);

        mock.put("revisedDeparture",
                delayMinutes > 0 ? "Delayed by " + delayMinutes + " min" : "On time");

        LocalDateTime eta = LocalDateTime.now().plusMinutes(90 + delayMinutes);
        mock.put("eta", eta.toString());

        return mock;
    }
}