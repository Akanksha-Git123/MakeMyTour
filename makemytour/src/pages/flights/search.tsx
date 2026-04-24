"use client";

import { useEffect, useState } from "react";
import { searchRealFlights } from "@/lib/api";
import { useRouter } from "next/router";

export default function SearchFlights() {
  const [flights, setFlights] = useState<any[]>([]);
  const [priceHistory, setPriceHistory] = useState<any>({});
  const [frozenPrices, setFrozenPrices] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    loadFlights();

    // 🔥 REAL-TIME PRICE UPDATE
    const interval = setInterval(loadFlights, 10000);
    return () => clearInterval(interval);
  }, []);

  const generatePrice = (flightNumber: string) => {
    const basePrice = 3000;

    const demandFactor = Math.random() * 0.5 + 1; // 1x - 1.5x
    const peakHour = new Date().getHours() >= 18 ? 1.2 : 1;

    const price = Math.floor(basePrice * demandFactor * peakHour);

    // 📊 SAVE HISTORY
    setPriceHistory((prev: any) => {
      const prevData = prev[flightNumber] || [];
      return {
        ...prev,
        [flightNumber]: [...prevData.slice(-9), price],
      };
    });

    return price;
  };

  const loadFlights = async () => {
    try {
      const data = await searchRealFlights("BOM", "DEL");

      const mappedFlights = (Array.isArray(data) ? data : []).map((f: any) => {
        const price = frozenPrices[f.flight_number] || generatePrice(f.flight_number);

        return {
          id: f.flight_number,
          airline: f.airline_name || f.airline_iata || "Unknown Airline",
          flightNumber: f.flight_number,
          fromCity: f.dep_iata,
          toCity: f.arr_iata,
          scheduledDeparture: f.dep_time || "N/A",
          status: f.status || "On Time",
          availableSeats: Math.floor(Math.random() * 20) + 1,
          price,
        };
      });

      setFlights(mappedFlights);
    } catch (err) {
      console.log(err);
    }
  };

  const freezePrice = (flightNumber: string, price: number) => {
    setFrozenPrices((prev: any) => ({
      ...prev,
      [flightNumber]: price,
    }));

    setTimeout(() => {
      setFrozenPrices((prev: any) => {
        const updated = { ...prev };
        delete updated[flightNumber];
        return updated;
      });
    }, 30000); // 30 sec freeze
  };

  const handleBooking = (flight: any) => {
    router.push({
      pathname: `/book-flight/${flight.id}`,
      query: flight,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Dynamic Flight Pricing ✈
      </h1>

      {flights.map((f) => (
        <div key={f.id} className="border p-4 mb-4 rounded shadow bg-white">

          <p className="text-lg font-bold">
            {f.airline} ({f.flightNumber})
          </p>

          <p>{f.fromCity} → {f.toCity}</p>
          <p>Status: {f.status}</p>

          {/* 💰 PRICE */}
          <p className="text-xl font-bold text-green-600">
            ₹{f.price}
          </p>

          {/* 📊 HISTORY */}
          <div className="text-sm text-gray-500">
            Price Trend: {priceHistory[f.flightNumber]?.join(" → ")}
          </div>

          {/* ❄ FREEZE */}
          <button
            onClick={() => freezePrice(f.flightNumber, f.price)}
            className="bg-blue-500 text-white px-3 py-1 mt-2 rounded"
          >
            Freeze Price
          </button>

          {/* BOOK */}
          <button
            onClick={() => handleBooking(f)}
            className="bg-green-600 text-white px-4 py-2 mt-2 ml-2 rounded"
          >
            Book Now
          </button>

        </div>
      ))}
    </div>
  );
}