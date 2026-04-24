"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createBooking } from "@/lib/api";
import { useSelector } from "react-redux";

export default function BookFlight() {
  const router = useRouter();

  const {
    airline,
    flightNumber,
    fromCity,
    toCity,
    seats,
    price,
  } = router.query;

  const user = useSelector((state: any) => state.user.user);

  const [flight, setFlight] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (flightNumber) {
      setFlight({
        airline,
        flightNumber,
        fromCity,
        toCity,
        availableSeats: Number(seats),
        price: Number(price) || 5000,
      });
    }
  }, [flightNumber, airline, fromCity, toCity, seats, price]);

  const handleBooking = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);

      // Backend booking API
      await createBooking({
        flightId: flight.flightNumber,
        userEmail: user.email,
        bookingAmount: flight.price,

        airline: flight.airline,
        fromCity: flight.fromCity,
        toCity: flight.toCity,
      });

      // ✅ SAVE TO LOCALSTORAGE FOR MY TRIPS
      const existingBookings = JSON.parse(
        localStorage.getItem("myBookings") || "[]"
      );

      const newBooking = {
        id: Date.now().toString(),
        flightNumber: flight.flightNumber,
        airline: flight.airline,
        fromCity: flight.fromCity,
        toCity: flight.toCity,
        bookingAmount: flight.price,
        availableSeats: flight.availableSeats,
        cancelled: false,
        bookingDate: new Date().toISOString(),
      };

      localStorage.setItem(
        "myBookings",
        JSON.stringify([newBooking, ...existingBookings])
      );

      alert("Booking Confirmed!");

      router.push("/dashboard/my-trips");

    } catch (error) {
      console.log(error);
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!flight) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">
          Book Flight ✈
        </h1>

        <div className="space-y-2">
          <p>
            <strong>Airline:</strong> {flight.airline}
          </p>

          <p>
            <strong>Flight Number:</strong>{" "}
            {flight.flightNumber}
          </p>

          <p>
            <strong>Route:</strong> {flight.fromCity} →{" "}
            {flight.toCity}
          </p>

          <p>
            <strong>Available Seats:</strong>{" "}
            {flight.availableSeats}
          </p>

          <p className="text-green-600 font-bold text-lg">
            ₹{flight.price}
          </p>
        </div>

        <button
          disabled={
            flight.availableSeats === 0 || loading
          }
          onClick={handleBooking}
          className={`w-full px-4 py-2 mt-6 rounded text-white ${
            flight.availableSeats === 0
              ? "bg-gray-400"
              : "bg-green-600"
          }`}
        >
          {flight.availableSeats === 0
            ? "Sold Out"
            : loading
            ? "Booking..."
            : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}


// fallback root page
export function BookFlightRoot() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-semibold">
        Invalid Flight URL
      </h1>

      <p className="text-gray-700 mt-2">
        Please select a flight from the home page.
      </p>
    </div>
  );
}