"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { getflight } from "@/lib/api";

export default function FlightStatus() {
  const router = useRouter();
  const { flightId } = router.query;

  const [flight, setFlight] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("On Time");

  useEffect(() => {
    if (!flightId) return;
  
    const statuses = ["On Time", "Boarding", "Delayed by 1h"];
  
    const interval = setInterval(() => {
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setStatus(randomStatus);
    }, 5000);
  
    return () => clearInterval(interval);
  }, [flightId]);

  if (loading || !flight) return <Loader />;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-3">Live Flight Status</h2>

      <div className="bg-white shadow p-4 rounded-lg">
        <p className="text-lg font-semibold">{flight.flightName}</p>

        <p>{flight.from} → {flight.to}</p>
        <p className="mt-2">Status: <strong>{status}</strong></p>
      </div>
    </div>
  );
}
