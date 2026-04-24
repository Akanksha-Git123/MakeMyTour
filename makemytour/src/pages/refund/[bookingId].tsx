"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface RefundStatusProps {
  bookingId: string;
}

interface RefundData {
  refundStatus: string;
  expectedRefundDate: string;
}

export default function RefundStatus({
  bookingId,
}: RefundStatusProps) {
  const [data, setData] = useState<RefundData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRefundStatus = async () => {
      try {
        const res = await axios.get(
          `/api/refund/status/${bookingId}`
        );

        setData(res.data);
      } catch (error) {
        console.error("Error fetching refund status:", error);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchRefundStatus();
    } else {
      setLoading(false);
    }
  }, [bookingId]);

  if (loading) {
    return (
      <div className="p-5">
        <h2 className="text-xl font-bold">Refund Status</h2>
        <p>Loading refund details...</p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">
        Refund Status
      </h2>

      {data ? (
        <div className="bg-yellow-100 p-4 rounded-lg">
          <p>
            <strong>Status:</strong>{" "}
            {data.refundStatus}
          </p>

          <p>
            <strong>Expected Date:</strong>{" "}
            {data.expectedRefundDate}
          </p>
        </div>
      ) : (
        <p>No refund data found.</p>
      )}
    </div>
  );
}