"use client";

import { useEffect, useState } from "react";
import { getAllFlights } from "@/lib/api";
import Loader from "@/components/Loader";

export default function FreezePricing() {
  const [flights, setFlights] = useState<any[]>([]);
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [freezing, setFreezing] = useState(false);

  // ✅ Fallback flights (safe backup)
  const fallbackFlights = [
    {
      id: "1",
      flightNumber: "AI202",
      fromCity: "Mumbai",
      toCity: "Delhi",
      price: 5000,
    },
    {
      id: "2",
      flightNumber: "6E2132",
      fromCity: "Pune",
      toCity: "Delhi",
      price: 5200,
    },
    {
      id: "3",
      flightNumber: "AI2430",
      fromCity: "Kolkata",
      toCity: "Delhi",
      price: 5800,
    },
  ];

  useEffect(() => {
    const loadFlights = async () => {
      try {
        // ✅ STEP 1: GET FROM LIVE TRACKING (MAIN SOURCE)
        const stored = localStorage.getItem("liveFlights");

        if (stored) {
          const parsed = JSON.parse(stored);

          if (Array.isArray(parsed) && parsed.length > 0) {
            const mappedFlights = parsed.map((f: any, index: number) => ({
              id: index,

              // ✅ FIXED MAPPING (IMPORTANT)
              flightNumber:
                f.airline_iata && f.flight_number
                  ? f.airline_iata + f.flight_number
                  : "FL" + index,

              fromCity: f.dep_iata || "NA",
              toCity: f.arr_iata || "NA",

              price: Math.floor(Math.random() * 2000) + 5000,
            }));

            setFlights(mappedFlights);
            setLoading(false);
            return;
          }
        }

        // ✅ STEP 2: API fallback
        const apiFlights = await getAllFlights();

        if (apiFlights && apiFlights.length > 0) {
          setFlights(apiFlights);
        } else {
          setFlights(fallbackFlights);
        }

      } catch (err) {
        console.log("Error:", err);
        setFlights(fallbackFlights);
      } finally {
        setLoading(false);
      }
    };

    loadFlights();
  }, []);

  const handleFreeze = async () => {
    if (!selected) {
      setMessage("Please select a flight first ⚠️");
      return;
    }

    try {
      setFreezing(true);

      const selectedFlight = flights.find(
        (f) => f.flightNumber === selected
      );

      const price =
        selectedFlight?.price ||
        Math.floor(Math.random() * 2000) + 5000;

      // ✅ STORE SELECTED FLIGHT
      localStorage.setItem(
        "selectedFlight",
        JSON.stringify(selectedFlight)
      );

      // ✅ STORE FREEZE DATA
      localStorage.setItem(
        "frozenPrice",
        JSON.stringify({
          flightId: selected,
          price,
          expiry: Date.now() + 24 * 60 * 60 * 1000,
        })
      );

      setMessage(
        `✅ Flight ${selected} price ₹${price} frozen for 24 hours`
      );

    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to freeze price");
    } finally {
      setFreezing(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Freeze Flight Price
      </h1>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border p-3 rounded mb-4 w-full"
      >
        <option value="">Select Flight</option>

        {flights.map((f) => (
          <option key={f.id} value={f.flightNumber}>
            {f.flightNumber} ({f.fromCity} → {f.toCity}) — ₹{f.price}
          </option>
        ))}
      </select>

      <button
        onClick={handleFreeze}
        disabled={freezing}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {freezing ? "Freezing..." : "Freeze Price"}
      </button>

      {message && (
        <p className="mt-4 text-green-700 font-semibold">
          {message}
        </p>
      )}
    </div>
  );
}