"use client";

import { useState } from "react";
import { cancelBooking } from "@/lib/api";

export default function CancelBooking({ params }) {
  const { bookingId } = params;

  const [status, setStatus] = useState(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleCancel = async () => {
    if (!reason) {
      setError("Please select a cancellation reason");
      return;
    }

    try {
      setError("");
      const result = await cancelBooking(bookingId, reason);
      setStatus(result);
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Cancel Booking</h1>

      {/* ✅ Reason Dropdown */}
      <select
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      >
        <option value="">Select Reason</option>
        <option value="change_plan">Change of plans</option>
        <option value="price">Found cheaper option</option>
        <option value="other">Other</option>
      </select>

      {/* ❌ Error Message */}
      {error && (
        <p className="text-red-500 mb-3">{error}</p>
      )}

      {/* ✅ Cancel Button */}
      <button
        onClick={handleCancel}
        className="bg-red-500 text-white p-3 rounded w-full"
      >
        Confirm Cancellation
      </button>

      {/* ✅ Result */}
      {status && (
        <div className="bg-yellow-100 p-3 mt-4 rounded">
          <p>Status: {status.refundStatus}</p>
          <p>Refund: ₹{status.refundAmount}</p>
        </div>
      )}
    </div>
  );
}