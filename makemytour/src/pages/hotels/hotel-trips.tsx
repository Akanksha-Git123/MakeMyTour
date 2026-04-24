"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

export default function HotelTrips() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const storedBookings = JSON.parse(
      localStorage.getItem("hotelBookings") || "[]"
    );

    setBookings(storedBookings);
  }, []);

  const handleCancelBooking = (bookingId: string) => {
    const updatedBookings = bookings.map((booking) => {
      if (booking.id === bookingId) {
        return {
          ...booking,
          cancelled: true,
          refundAmount: Math.floor(
            booking.bookingAmount * 0.5
          ),
          refundStatus: "Processing",
        };
      }
      return booking;
    });

    setBookings(updatedBookings);

    localStorage.setItem(
      "hotelBookings",
      JSON.stringify(updatedBookings)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            My Hotel Trips
          </h1>

          <Button
            onClick={() => router.push("/hotels/list")}
          >
            Book New Hotel
          </Button>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-gray-500 text-lg">
              No hotel bookings yet.
            </p>

            <Button
              className="mt-4"
              onClick={() =>
                router.push("/hotels/list")
              }
            >
              Browse Hotels
            </Button>
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white p-6 rounded-lg shadow mb-4"
            >
              <h2 className="text-2xl font-bold">
                {booking.hotelName}
              </h2>

              <p className="text-gray-600 mt-2">
                📍 {booking.location}
              </p>

              <p className="mt-2">
                Room Type:{" "}
                <span className="font-semibold">
                  {booking.roomType}
                </span>
              </p>

              <p className="mt-2">
                Booking Amount: ₹
                {booking.bookingAmount}
              </p>

              <p className="mt-2">
                Booking Date: {booking.bookingDate}
              </p>

              {!booking.cancelled ? (
                <div className="mt-4">
                  <p className="text-green-600 font-semibold">
                    Confirmed ✅
                  </p>

                  <Button
                    className="mt-3 bg-red-600 hover:bg-red-700"
                    onClick={() =>
                      handleCancelBooking(
                        booking.id
                      )
                    }
                  >
                    Cancel Booking
                  </Button>
                </div>
              ) : (
                <div className="mt-4">
                  <p className="text-red-600 font-semibold">
                    Cancelled ❌
                  </p>

                  <p className="text-green-600 mt-2">
                    Refund Amount: ₹
                    {booking.refundAmount}
                  </p>

                  <p className="text-blue-600">
                    Refund Status:{" "}
                    {booking.refundStatus}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}