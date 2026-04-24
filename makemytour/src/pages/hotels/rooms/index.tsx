"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getRoomsByHotel } from "@/lib/api";

export default function RoomsPage() {
  const router = useRouter();
  const { id } = router.query;

  const [rooms, setRooms] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fallbackRooms = [
    {
      id: "1",
      type: "Standard Room",
      price: 3000,
      imageUrl:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      features: ["WiFi", "AC", "TV"],
    },
    {
      id: "2",
      type: "Deluxe Room",
      price: 6000,
      imageUrl:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      features: ["Sea View", "Breakfast", "King Bed"],
    },
  ];

  useEffect(() => {
    if (!id) return;

    getRoomsByHotel(id as string)
      .then((data) => {
        if (data?.length > 0) {
          setRooms(data);
        } else {
          setRooms(fallbackRooms);
        }
      })
      .catch(() => {
        setRooms(fallbackRooms);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const selectRoom = (room: any) => {
    setSelectedRoom(room);
    localStorage.setItem(
      "preferredRoom",
      JSON.stringify(room)
    );
  };

  if (loading) return <p>Loading rooms...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Select Your Room 🏨
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => selectRoom(room)}
            className={`p-5 rounded-xl shadow cursor-pointer ${
              selectedRoom?.id === room.id
                ? "border-2 border-blue-500 bg-blue-50"
                : "bg-white"
            }`}
          >
            <img
              src={room.imageUrl}
              className="w-full h-40 object-cover rounded"
            />

            <h2 className="text-xl font-bold mt-3">
              {room.type}
            </h2>

            <p>₹{room.price}</p>

            {room.price > 5000 && (
              <p className="text-purple-600">
                Premium Upgrade ⭐
              </p>
            )}

            {room.features.map((f: string) => (
              <p key={f}>• {f}</p>
            ))}

            {selectedRoom?.id === room.id && (
              <p className="text-green-600 mt-2">
                Selected ✅
              </p>
            )}
          </div>
        ))}
      </div>

      {selectedRoom && (
        <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded">
          Continue Booking
        </button>
      )}
    </div>
  );
}