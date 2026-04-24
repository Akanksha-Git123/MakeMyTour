"use client";

import { useEffect, useState } from "react";
import { getNotifications, getLiveStatus } from "@/lib/api";

export default function Notifications() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();

    // 🔥 Trigger backend to generate notifications
    const generator = setInterval(() => {
      getLiveStatus("AI101"); // generates new notifications
    }, 5000);

    // 🔥 Fetch latest notifications
    const fetchInterval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => {
      clearInterval(generator);
      clearInterval(fetchInterval);
    };
  }, []);

  const fetchData = async () => {
    try {
      const res = await getNotifications("user123");
      setData(res || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        🔔 Notifications
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">No notifications</p>
      ) : (
        <div className="space-y-4">
          {data.map((n) => (
            <div
              key={n.id}
              className="bg-white border rounded-lg shadow-sm p-4 transition hover:shadow-md"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-blue-600">{n.type}</p>
                <span className="text-xs text-gray-400">{n.time}</span>
              </div>

              <p className="mt-2 text-gray-800">{n.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}