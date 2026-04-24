"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { cancelBooking } from "@/lib/api";

interface CancelResponse {
  refundStatus: string;
  refundAmount: number;
}

export default function CancelBooking() {
  const router = useRouter();
  const { bookingId } = router.query;

  const [status, setStatus] = useState<CancelResponse | null>(null);
  const [reason, setReason] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleCancel = async () => {
    if (!reason) {
      setError("Please select a cancellation reason");
      return;
    }

    if (!bookingId) {
      setError("Booking ID not found");
      return;
    }

    try {
      setError("");

      const result = await cancelBooking(
        String(bookingId),
        reason
      );

      setStatus(result.data || result);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">
        Cancel Booking
      </h1>

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

      {error && (
        <p className="text-red-500 mb-3">
          {error}
        </p>
      )}

      <button
        onClick={handleCancel}
        className="bg-red-500 text-white p-3 rounded w-full"
      >
        Confirm Cancellation
      </button>

      {status && (
        <div className="bg-yellow-100 p-3 mt-4 rounded">
          <p>Status: {status.refundStatus}</p>
          <p>Refund: ₹{status.refundAmount}</p>
        </div>
      )}
    </div>
  );
}