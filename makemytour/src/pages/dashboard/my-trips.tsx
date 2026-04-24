"use client";

import { useEffect, useState } from "react";

const reasons = [
  "Change of plans",
  "Found better price",
  "Emergency",
  "Wrong booking details",
  "Other",
];

export default function MyTrips() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [cancelReason, setCancelReason] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    try {
      const storedBookings =
        JSON.parse(localStorage.getItem("myBookings") || "[]");

      console.log("Stored bookings:", storedBookings);

      if (Array.isArray(storedBookings)) {
        setBookings(storedBookings);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.log(error);
      setBookings([]);
    }
  }, []);

  const handleCancel = (id: string) => {
    if (!cancelReason[id]) {
      alert("Please select cancellation reason");
      return;
    }

    const updatedBookings = bookings.map((booking) => {
      if (booking.id === id) {
        return {
          ...booking,
          cancelled: true,
          refundAmount: Math.floor(
            (booking.bookingAmount || booking.price || 0) * 0.5
          ),
          refundStatus: "PENDING",
          cancellationReason: cancelReason[id],
        };
      }
      return booking;
    });

    setBookings(updatedBookings);
    localStorage.setItem(
      "myBookings",
      JSON.stringify(updatedBookings)
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        My Trips
      </h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking, index) => (
          <div
            key={booking.id || index}
            className="bg-white p-5 mb-4 rounded-lg shadow"
          >
            {/* Route / Hotel */}
            <h2 className="text-xl font-bold">
              {booking.fromCity && booking.toCity
                ? `${booking.fromCity} → ${booking.toCity}`
                : booking.hotelName || "Booking"}
            </h2>

            {/* Flight number */}
            {booking.flightNumber && (
              <p className="text-gray-600">
                Flight: {booking.flightNumber}
              </p>
            )}

            {/* Hotel room */}
            {booking.roomType && (
              <p className="text-gray-600">
                Room: {booking.roomType}
              </p>
            )}

            {/* Amount */}
            <p className="font-semibold mt-2">
              ₹
              {booking.bookingAmount ||
                booking.price ||
                booking.pricePerNight ||
                0}
            </p>

            {/* Status */}
            <p className="mt-2">
              {booking.cancelled
                ? "❌ Cancelled"
                : "✅ Confirmed"}
            </p>

            {/* Cancel section */}
            {!booking.cancelled && (
              <>
                <select
                  className="border p-2 mt-3 w-full rounded"
                  value={
                    cancelReason[booking.id] || ""
                  }
                  onChange={(e) =>
                    setCancelReason({
                      ...cancelReason,
                      [booking.id]: e.target.value,
                    })
                  }
                >
                  <option value="">
                    Select cancellation reason
                  </option>

                  {reasons.map((reason) => (
                    <option
                      key={reason}
                      value={reason}
                    >
                      {reason}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() =>
                    handleCancel(booking.id)
                  }
                  className="bg-red-500 text-white px-4 py-2 mt-3 rounded"
                >
                  Cancel Booking
                </button>
              </>
            )}

            {/* Refund section */}
            {booking.cancelled && (
              <div className="mt-3 bg-green-50 p-3 rounded">
                <p className="text-green-600 font-semibold">
                  Refund Amount: ₹
                  {booking.refundAmount}
                </p>

                <p>
                  Refund Status:{" "}
                  {booking.refundStatus}
                </p>

                <p>
                  Cancellation Reason:{" "}
                  {booking.cancellationReason}
                </p>

                <p className="text-sm text-gray-500">
                  Expected refund within 5–7 business
                  days
                </p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}