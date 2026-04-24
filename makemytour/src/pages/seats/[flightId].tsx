"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSeatsByFlight } from "@/lib/api";

type Seat = {
  id: string;
  seatNumber: string;
  type: "WINDOW" | "AISLE" | "MIDDLE";
  price: number;
  booked: boolean;
};

export default function SeatSelectionPage() {
  const router = useRouter();
  const { flightId } = router.query;

  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!flightId) return;

    getSeatsByFlight(String(flightId))
      .then((data) => setSeats(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [flightId]);

  // 🎯 GROUP INTO ROWS (like airplane)
  const groupedSeats = [];
  const seatsPerRow = 6;

  for (let i = 0; i < seats.length; i += seatsPerRow) {
    groupedSeats.push(seats.slice(i, i + seatsPerRow));
  }

  const getSeatColor = (seat: Seat) => {
    if (seat.booked) return "bg-gray-300 cursor-not-allowed";
    if (selectedSeat?.id === seat.id) return "bg-blue-500 text-white";
    if (seat.price > 3000) return "bg-yellow-200"; // premium
    return "bg-green-200";
  };

  if (loading) return <p className="p-6">Loading seats...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">

      <h1 className="text-3xl font-bold mb-6">
        Select Your Seat ✈️
      </h1>

      {/* LEGEND */}
      <div className="flex gap-4 mb-6 text-sm">
        <span className="bg-green-200 px-3 py-1 rounded">Available</span>
        <span className="bg-yellow-200 px-3 py-1 rounded">Premium</span>
        <span className="bg-gray-300 px-3 py-1 rounded">Booked</span>
        <span className="bg-blue-500 text-white px-3 py-1 rounded">Selected</span>
      </div>

      {/* SEAT MAP */}
      <div className="bg-white p-6 rounded-xl shadow">

        {groupedSeats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center justify-center mb-3 gap-2">

            {row.map((seat, i) => (
              <>
                {/* LEFT SIDE */}
                {i === 3 && (
                  <div className="w-6"></div> // aisle gap
                )}

                <div
                  key={seat.id}
                  onClick={() => {
                    if (!seat.booked) setSelectedSeat(seat);
                  }}
                  className={`w-10 h-10 flex items-center justify-center rounded cursor-pointer text-sm font-medium transition
                    ${getSeatColor(seat)}
                  `}
                >
                  {seat.seatNumber}
                </div>
              </>
            ))}

          </div>
        ))}

      </div>

      {/* SELECTED INFO */}
      {selectedSeat && (
        <div className="mt-6 bg-white p-5 rounded-xl shadow text-center">

          <h2 className="text-lg font-semibold">
            Selected Seat: {selectedSeat.seatNumber}
          </h2>

          <p className="text-gray-600">
            ₹{selectedSeat.price}
          </p>

          <button
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
            onClick={() => alert("Seat booked successfully!")}
          >
            Confirm Seat →
          </button>

        </div>
      )}

    </div>
  );
}