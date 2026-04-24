"use client";

import { useState } from "react";
import { cancelBooking } from "@/lib/api";
import { Button } from "./ui/button";

const reasons = [
  "Change of plans",
  "Booked by mistake",
  "Found better price",
  "Health issues",
  "Other"
];

export default function CancelModal({ booking, onClose, onSuccess }: any) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!reason) return alert("Please select a reason");

    setLoading(true);
    try {
      await cancelBooking(booking.id, reason);
      alert("Booking cancelled successfully!");
      onSuccess();
    } catch (e) {
      console.log(e);
      alert("Cancellation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-3">Cancel Booking</h2>

        <label className="font-medium">Select Reason:</label>
        <select
          className="border p-2 rounded w-full mt-2"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          <option value="">Choose...</option>
          {reasons.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3 mt-5">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleCancel} disabled={loading}>
            {loading ? "Cancelling..." : "Confirm Cancel"}
          </Button>
        </div>
      </div>
    </div>
  );
}