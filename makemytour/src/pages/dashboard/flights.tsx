"use client";

import { useRouter } from "next/navigation";
import { Radar, Tickets, DollarSign, Clock, Plane } from "lucide-react";

export default function FlightsDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <div className="flex items-center gap-3 mb-6">
          <Plane className="text-blue-600 w-8 h-8" />
          <h1 className="text-3xl font-bold">Flights Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 🔥 BOOK FLIGHT */}
          <DashboardCard
            icon={<Plane className="w-10 h-10 text-indigo-600" />}
            title="Book Flight"
            desc="Search and book flights"
            onClick={() => router.push("/flights/search")}
          />

          <DashboardCard
            icon={<Radar className="w-10 h-10 text-blue-600" />}
            title="Live Tracking"
            desc="Track flights"
            onClick={() => router.push("/dashboard/live-tracking")}
          />

          <DashboardCard
            icon={<Tickets className="w-10 h-10 text-green-600" />}
            title="My Trips"
            desc="View bookings"
            onClick={() => router.push("/dashboard/my-trips")}
          />

        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, desc, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border p-6 rounded-xl shadow hover:shadow-xl transition"
    >
      <div className="flex gap-4 items-center">
        {icon}
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-500">{desc}</p>
        </div>
      </div>
    </div>
  );
}