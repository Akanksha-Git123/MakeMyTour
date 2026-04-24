"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getHotels } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function HotelDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [hotel, setHotel] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    async function loadHotel() {
      const hotels = await getHotels();

      const selected = hotels.find(
        (h: any) =>
          h.id === id || h._id === id
      );

      setHotel(selected);
    }

    loadHotel();
  }, [id]);

  if (!hotel) return <p>Loading hotel details...</p>;

  const images = [
    hotel.imageUrl,
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        {hotel.hotelName}
      </h1>

      <p className="mb-4">📍 {hotel.location}</p>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className="h-56 w-full object-cover rounded"
          />
        ))}
      </div>

      <div className="bg-white p-6 rounded shadow">
        <p className="text-green-600 text-2xl font-bold">
          ₹{hotel.pricePerNight}/night
        </p>

        <p className="mt-4">
          Available Rooms: 12
        </p>

        <h3 className="font-bold mt-4">
          Amenities:
        </h3>

        <ul className="list-disc ml-6">
          <li>Free WiFi</li>
          <li>Pool</li>
          <li>Parking</li>
          <li>Breakfast</li>
        </ul>

        <div className="flex gap-4 mt-6">
          <Button
            onClick={() =>
              router.push(`/hotels/rooms/${hotel.id || hotel._id}`)
            }
          >
            Select Room
          </Button>

          <Button
            onClick={() =>
              router.push(`/hotels/reviews/${hotel.id || hotel._id}`)
            }
          >
            View Reviews
          </Button>
        </div>
      </div>
    </div>
  );
}