package com.makemytrip.makemytrip.services;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class FlightService {

    private final String API_KEY = "YOUR_AVIATIONSTACK_KEY";
    private final String BASE_URL = "http://api.aviationstack.com/v1/flights";

    public List<JSONObject> search(String from, String to) {

        try {
            String today = LocalDate.now().toString();

            String url = BASE_URL +
                    "?access_key=" + API_KEY +
                    "&dep_iata=" + from +
                    "&arr_iata=" + to +
                    "&flight_date=" + today;

            RestTemplate rest = new RestTemplate();

            String response = rest.getForObject(url, String.class);
            JSONObject obj = new JSONObject(response);

            if (!obj.has("data")) return new ArrayList<>();

            JSONArray arr = obj.getJSONArray("data");
            List<JSONObject> results = new ArrayList<>();

            for (int i = 0; i < arr.length(); i++) {
                results.add(arr.getJSONObject(i));
            }

            return results;

        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}
