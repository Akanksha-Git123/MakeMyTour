"use client";

import { useEffect, useState } from "react";

export default function PricingDashboard() {
  const [price, setPrice] = useState(5000);
  const [history, setHistory] = useState<any[]>([]);
  const [reason, setReason] = useState("");
  const [freeze, setFreeze] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [prediction, setPrediction] = useState("");

  // ✅ EXISTING (DON'T CHANGE)
  const [selectedFlight, setSelectedFlight] = useState<any>(null);

  // ✅ LOAD SELECTED FLIGHT
  useEffect(() => {
    const storedFlight = localStorage.getItem("selectedFlight");
    if (storedFlight) {
      setSelectedFlight(JSON.parse(storedFlight));
    }
  }, []);

  // ✅ LOAD FREEZE (KEEP SAME)
  useEffect(() => {
    const storedFreeze = localStorage.getItem("frozenPrice");

    if (storedFreeze) {
      const parsed = JSON.parse(storedFreeze);

      if (Date.now() < parsed.expiry) {
        setPrice(parsed.price);
        setFreeze(parsed.expiry);
      } else {
        localStorage.removeItem("frozenPrice");
      }
    }
  }, []);

  // ✅ ORIGINAL LOGIC (UNCHANGED)
  const generatePrice = () => {
    const base = 5000;

    const demand = Math.random() * 0.3 + 1;
    const hour = new Date().getHours();
    const day = new Date().getDay();

    const peak = hour >= 18 ? 1.2 : 1;
    const weekend = day === 0 || day === 6 ? 1.2 : 1;

    const finalPrice = Math.floor(base * demand * peak * weekend);

    let reasons = [];
    if (demand > 1.15) reasons.push("High demand");
    if (peak > 1) reasons.push("Peak hours");
    if (weekend > 1) reasons.push("Weekend surge");

    // 🔮 Prediction (UNCHANGED)
    if (demand > 1.2) {
      setPrediction("⚠ Price likely to increase");
    } else {
      setPrediction("✅ Good time to book");
    }

    return {
      finalPrice,
      reasonText: reasons.join(" + ") || "Normal pricing",
    };
  };

  const updatePrice = () => {
    if (freeze && Date.now() < freeze) return;

    const { finalPrice, reasonText } = generatePrice();

    setPrice(finalPrice);
    setReason(reasonText);

    setHistory((prev) => [
      ...prev.slice(-9),
      {
        price: finalPrice,
        time: new Date().toLocaleTimeString(),
        reason: reasonText,
      },
    ]);
  };

  // ✅ AUTO UPDATE (UNCHANGED)
  useEffect(() => {
    updatePrice();
    const interval = setInterval(updatePrice, 8000);
    return () => clearInterval(interval);
  }, [freeze]);

  // ✅ COUNTDOWN (UNCHANGED)
  useEffect(() => {
    if (!freeze) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((freeze - Date.now()) / 1000));
      setCountdown(remaining);

      if (remaining <= 0) {
        setFreeze(null);
        setCountdown(0);
        localStorage.removeItem("frozenPrice");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [freeze]);

  // ✅ FREEZE BUTTON (UNCHANGED)
  const freezePrice = () => {
    const expiry = Date.now() + 30000;

    setFreeze(expiry);
    setCountdown(30);

    localStorage.setItem(
      "frozenPrice",
      JSON.stringify({
        price,
        expiry,
      })
    );
  };

  // ✅ ✅ NEW: BOOK FLIGHT (NO EXISTING LOGIC TOUCHED)
  const handleBookFlight = () => {
    if (!selectedFlight) return;

    const booking = {
      id: Date.now().toString(),
      flightId: selectedFlight.flightNumber,
      fromCity: selectedFlight.fromCity,
      toCity: selectedFlight.toCity,
      airline: selectedFlight.flightNumber?.slice(0, 2) || "NA",
      bookingAmount: price,
      cancelled: false,
      bookingTime: new Date().toISOString(),
    };

    const existing =
      JSON.parse(localStorage.getItem("myBookings") || "[]");

    localStorage.setItem(
      "myBookings",
      JSON.stringify([booking, ...existing])
    );

    alert("Flight booked successfully!");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-4">
        Dynamic Pricing Engine 💰
      </h1>

      {/* ✅ FLIGHT (UNCHANGED) */}
      {selectedFlight && (
        <p className="mb-2 font-semibold">
          Flight: {selectedFlight.flightNumber} (
          {selectedFlight.fromCity} → {selectedFlight.toCity})
        </p>
      )}

      {/* ✅ PRICE BOX (UNCHANGED UI) */}
      <div className="bg-blue-100 p-4 rounded mb-4">
        <p className="text-xl font-bold">
          Current Price: ₹{price}
        </p>

        <p className="text-sm text-gray-700">
          Reason: {reason}
        </p>

        <p className="text-sm mt-1">{prediction}</p>

        {freeze && (
          <p className="text-green-700 mt-2">
            Price frozen • {countdown}s remaining
          </p>
        )}
      </div>

      {/* ✅ BUTTONS (ONLY ADDED BOOK BUTTON) */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={freezePrice}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Freeze Price (30 sec)
        </button>

        {/* ✅ NEW BUTTON */}
        <button
          onClick={handleBookFlight}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Book Flight
        </button>
      </div>

      {/* ✅ PRICING LOGIC (UNCHANGED) */}
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h3 className="font-semibold mb-2">Pricing Logic</h3>
        <ul className="text-sm list-disc ml-5">
          <li>Base price: ₹5000</li>
          <li>Demand factor: 1.0x – 1.3x</li>
          <li>Peak hour: +20%</li>
          <li>Weekend surge: +20%</li>
          <li>Updates every 8 seconds</li>
        </ul>
      </div>

      {/* ✅ HISTORY (UNCHANGED) */}
      <h2 className="text-xl font-semibold mb-3">
        Price History
      </h2>

      <div className="space-y-2">
        {history.map((h, i) => (
          <div key={i} className="flex justify-between border p-2 rounded">
            <span>₹{h.price}</span>
            <span className="text-gray-500 text-sm">{h.time}</span>
          </div>
        ))}
      </div>

    </div>
  );
}