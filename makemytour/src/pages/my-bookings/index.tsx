"use client";

import { useEffect, useState } from "react";
import { getUserBookings, cancelBooking, getRefundStatus } from "@/lib/api";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

export default function MyBookings() {
  const user = useSelector((state: any) => state.user.user);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReason, setSelectedReason] = useState("Change of plans");

  const CANCEL_REASONS = [
    "Change of plans",
    "Booked by mistake",
    "Found a better price",
    "Medical reason",
    "Other",
  ];

  useEffect(() => {
    if (!user) return;

    async function load() {
      try {
        const data = await getUserBookings(user.email);
        setBookings(data);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }

    load();
  }, [user]);

  const handleCancel = async (id: string) => {
    try {
      const res = await cancelBooking(id, selectedReason);
      alert(`Booking cancelled! Refund: ₹${res.refundAmount}`);

      // Refresh bookings
      const data = await getUserBookings(user.email);
      setBookings(data);
    } catch (e) {
      alert("Failed to cancel booking");
    }
  };

  const checkRefund = async (id: string) => {
    try {
      const status = await getRefundStatus(id);
      alert(
        `Refund Status: ${status.refundStatus}\nRefund Amount: ₹${status.refundAmount}`
      );
    } catch {
      alert("Refund status unavailable");
    }
  };

  if (!user) return <p className="p-4">Please login to view bookings.</p>;
  if (loading) return <p className="p-4">Loading bookings...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b: any) => (
            <div key={b.id} className="border p-4 rounded shadow bg-white">
              <h2 className="text-lg font-semibold">
                Booking ID: {b.id}
              </h2>

              <p>User: {b.userEmail}</p>
              <p>Flight ID: {b.flightId}</p>
              <p>Amount: ₹{b.bookingAmount}</p>
              <p>Booking Time: {b.bookingTime?.toString().replace("T", " ")}</p>
              <p>
                Status:{" "}
                <span className={b.cancelled ? "text-red-500" : "text-green-600"}>
                  {b.cancelled ? "Cancelled" : "Active"}
                </span>
              </p>

              {!b.cancelled && (
                <div className="mt-4 space-y-3">
                  <select
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="border px-3 py-2 rounded w-full"
                  >
                    {CANCEL_REASONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>

                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => handleCancel(b.id)}
                  >
                    Cancel Booking
                  </Button>
                </div>
              )}

              {b.cancelled && (
                <Button
                  className="mt-3 bg-blue-600 hover:bg-blue-700"
                  onClick={() => checkRefund(b.id)}
                >
                  Check Refund Status
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}