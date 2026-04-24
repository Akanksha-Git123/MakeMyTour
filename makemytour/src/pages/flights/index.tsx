"use client";

import { useRouter } from "next/navigation";
import { Radar, Tickets, DollarSign, Clock, Plane } from "lucide-react";

export default function FlightsDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Plane className="text-blue-600 w-8 h-8" />
          <h1 className="text-3xl font-bold">Flights Dashboard</h1>
        </div>

        <p className="text-gray-600 mb-8">
          Manage all your flight tools from one place.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

{/* 🔥 NEW BUTTON */}
<DashboardCard
  icon={<Plane className="w-10 h-10 text-indigo-600" />}
  title="Book Flight"
  desc="Search and book available flights"
  onClick={() => router.push("/flights/search")}
/>

<DashboardCard
  icon={<Radar className="w-10 h-10 text-blue-600" />}
  title="Live Tracking"
  desc="Track flights in real time"
  onClick={() => router.push("/dashboard/live-tracking")}
/>

<DashboardCard
  icon={<DollarSign className="w-10 h-10 text-purple-600" />}
  title="Dynamic Pricing"
  desc="View real-time price calculation"
  onClick={() => router.push("/dashboard/pricing")}
/>

<DashboardCard
  icon={<Clock className="w-10 h-10 text-orange-600" />}
  title="Freeze Price"
  desc="Freeze flight price for 24 hours"
  onClick={() => router.push("/dashboard/freeze")}
/>

<DashboardCard
  icon={<Tickets className="w-10 h-10 text-green-600" />}
  title="My Trips"
  desc="View your bookings"
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
      className="cursor-pointer bg-white border rounded-xl p-6 shadow hover:shadow-xl hover:scale-[1.02] transition"
    >
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-500 text-sm">{desc}</p>
        </div>
      </div>
    </div>
  );
}
