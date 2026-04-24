"use client";

import { useEffect, useState } from "react";
import { getHotels } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function HotelsList() {
  const router = useRouter();
  const [hotels, setHotels] = useState<any[]>([]);

  const loadHotels = async () => {
    try {
      const data = await getHotels();
      setHotels(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadHotels();
  }, []);

  const deleteHotel = async (id: string) => {
    if (!confirm("Delete this hotel?")) return;

    try {
      const res = await fetch(
        `http://localhost:8080/admin/hotel/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        alert("Hotel deleted successfully");
        loadHotels();
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Available Hotels
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {hotels.map((hotel) => {
          const hotelId = hotel.id || hotel._id;

          return (
            <div
              key={hotelId}
              className="bg-white shadow rounded-lg p-4"
            >
              <img
                src={
                  hotel.imageUrl ||
                  "https://images.unsplash.com/photo-1566073771259-6a8506099945"
                }
                className="w-full h-52 object-cover rounded"
              />

              <h2 className="text-2xl font-bold mt-3">
                {hotel.hotelName}
              </h2>

              <p>📍 {hotel.location}</p>
              <p className="text-green-600 font-bold">
                ₹{hotel.pricePerNight}/night
              </p>

              <Button
                className="w-full mt-4"
                onClick={() =>
                  router.push(`/hotels/details/${hotelId}`)
                }
              >
                View Details
              </Button>

              <Button
                className="w-full mt-2 bg-yellow-500"
                onClick={() =>
                  router.push(`/hotels/edit/${hotelId}`)
                }
              >
                Edit Hotel
              </Button>

              <Button
                className="w-full mt-2 bg-red-600"
                onClick={() => deleteHotel(hotelId)}
              >
                Delete Hotel
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}