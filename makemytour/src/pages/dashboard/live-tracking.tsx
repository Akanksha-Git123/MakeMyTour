"use client";

import { useEffect, useState } from "react";
import { searchRealFlights } from "@/lib/api";
import Loader from "@/components/Loader";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map-component"), { ssr: false });

export default function LiveTracking() {
  const [from, setFrom] = useState("BOM");
  const [to, setTo] = useState("DEL");
  const [flights, setFlights] = useState<any[]>([]);
  const [prevFlights, setPrevFlights] = useState<any[]>([]);
  const [trackedFlights, setTrackedFlights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const [notification, setNotification] = useState("");

  const getStatusColor = (status: string) => {
    if (!status) return "text-gray-600";
    if (status.toLowerCase().includes("delayed")) return "text-red-600";
    if (status.toLowerCase().includes("airborne")) return "text-green-600";
    if (status.toLowerCase().includes("boarding")) return "text-blue-600";
    return "text-gray-600";
  };

  const fetchFlights = async () => {
    try {
      setLoading(true);

      const data = await searchRealFlights(from, to);

      const extraRoutes = [
        { from: "BLR", to: "DEL" },
        { from: "HYD", to: "DEL" },
        { from: "CCU", to: "DEL" },
      ];

      let extraFlights: any[] = [];

      for (let route of extraRoutes) {
        const res = await searchRealFlights(route.from, route.to);
        extraFlights = [...extraFlights, ...res];
      }

      const allFlights = [...data, ...extraFlights];

      const cleanFlights = allFlights.map((f: any, i: number) => {
        const delay = Math.floor(Math.random() * 60);
        const statuses = ["Airborne", "Delayed", "Boarding", "On Time"];
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        return {
          ...f,
          lat: typeof f.lat === "number" ? f.lat : 20 + i,
          lng: typeof f.lng === "number" ? f.lng : 75 + i,
          delay,
          reason: ["Weather", "Technical", "Crew", "Operational"][
            Math.floor(Math.random() * 4)
          ],
          eta: new Date(Date.now() + delay * 60000).toLocaleTimeString(),
          finalStatus:
            status === "Delayed" ? `Delayed by ${delay} min` : status,
        };
      });

      // 🔥 🔥 🔥 IMPORTANT FIX (THIS WAS MISSING)
      localStorage.setItem("liveFlights", JSON.stringify(cleanFlights));

      // notifications
      cleanFlights.forEach((flight: any) => {
        const prev = prevFlights.find(
          (p) =>
            p.flight_number === flight.flight_number &&
            p.airline_iata === flight.airline_iata
        );

        if (prev) {
          if (prev.delay !== flight.delay) {
            setNotification(
              `⚠️ Delay changed for ${flight.airline_iata}${flight.flight_number}`
            );
          }

          if (prev.finalStatus !== flight.finalStatus) {
            setNotification(
              `✈️ Status updated for ${flight.airline_iata}${flight.flight_number}`
            );
          }
        }
      });

      setPrevFlights(cleanFlights);
      setFlights(cleanFlights);
      setLastUpdated(new Date().toLocaleTimeString());

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const toggleTrack = (flightId: string) => {
    if (trackedFlights.includes(flightId)) {
      setTrackedFlights(trackedFlights.filter((f) => f !== flightId));
    } else {
      setTrackedFlights([...trackedFlights, flightId]);
    }
  };

  return (
    <div className="container mx-auto p-6">

      <h1 className="text-3xl font-bold mb-2">
        Live Flight Tracking ✈
      </h1>

      <p className="text-sm text-gray-500 mb-4">
        Last updated: {lastUpdated}
      </p>

      {notification && (
        <div className="bg-yellow-100 border px-4 py-2 mb-4 rounded">
          {notification}
        </div>
      )}

      <div className="flex gap-3 mb-6">
        <input value={from} onChange={(e) => setFrom(e.target.value)} className="border p-2 rounded" />
        <input value={to} onChange={(e) => setTo(e.target.value)} className="border p-2 rounded" />
        <button onClick={fetchFlights} className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      {loading && <Loader />}

      {!loading && flights.length === 0 && (
        <p>No live flight data found.</p>
      )}

      {flights.map((flight, index) => {
        const id = `${flight.airline_iata}${flight.flight_number}`;

        return (
          <div key={index} className="border rounded p-4 mb-6 shadow">

            <div className="flex justify-between">
              <h2 className="text-lg font-bold">✈ {id}</h2>

              <button
                onClick={() => toggleTrack(id)}
                className={`px-3 py-1 rounded ${
                  trackedFlights.includes(id)
                    ? "bg-green-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {trackedFlights.includes(id) ? "Tracked" : "Track"}
              </button>
            </div>

            <p>Route: {flight.dep_iata} → {flight.arr_iata}</p>
            <p className={getStatusColor(flight.finalStatus)}>
              Status: {flight.finalStatus}
            </p>

            <p>Delay: {flight.delay} min</p>
            <p>Reason: {flight.reason}</p>
            <p>ETA: {flight.eta}</p>

            <Map lat={flight.lat} lon={flight.lng} flight={id} />

          </div>
        );
      })}
    </div>
  );
}