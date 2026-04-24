import { useEffect, useState } from "react";
import axios from "axios";

export default function RefundStatus({ bookingId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`/api/refund/status/${bookingId}`)
      .then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Refund Status</h2>
      {data && (
        <>
          <p>Status: {data.refundStatus}</p>
          <p>Expected Date: {data.expectedRefundDate}</p>
        </>
      )}
    </div>
  );
}