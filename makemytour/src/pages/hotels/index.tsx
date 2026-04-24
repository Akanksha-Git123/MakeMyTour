"use client";

import { useRouter } from "next/router";
import {
  List,
  PlusCircle,
  Star,
  Building2
} from "lucide-react";

export default function HotelsDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Hotels Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* All Hotels */}
          <DashboardCard
            title="All Hotels"
            onClick={() => router.push("/hotels/list")}
            icon={<List />}
          />

          {/* Add Hotel */}
          <DashboardCard
            title="Add Hotel"
            onClick={() => router.push("/hotels/add")}
            icon={<PlusCircle />}
          />

          {/* Reviews */}
          <DashboardCard
            title="Reviews"
            onClick={() => router.push("/hotels/reviews")}
            icon={<Star />}
          />
<DashboardCard
  title="My Hotel Trips"
  onClick={() => router.push("/hotels/hotel-trips")}
  icon={<Building2 />}
/>

        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  onClick,
  icon,
}: any) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-6 border rounded shadow hover:shadow-lg transition"
    >
      {icon}

      <h2 className="text-xl font-bold mt-2">
        {title}
      </h2>
    </div>
  );
}