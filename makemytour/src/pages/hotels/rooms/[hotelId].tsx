"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getRoomsByHotel } from "@/lib/api";

export default function RoomsPage() {
  const router = useRouter();
  const { hotelId } = router.query;

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
    if (!hotelId) return;

    getRoomsByHotel(hotelId as string)
      .then((data) => {
        console.log("Rooms API:", data);

        if (data && data.length > 0) {
          setRooms(data);
        } else {
          setRooms(fallbackRooms);
        }
      })
      .catch((err) => {
        console.log("Room fetch error:", err);
        setRooms(fallbackRooms);
      })
      .finally(() => setLoading(false));
  }, [hotelId]);

  const selectRoom = (room: any) => {
    setSelectedRoom(room);

    localStorage.setItem(
      "preferredRoom",
      JSON.stringify(room)
    );
  };

  const continueBooking = () => {
    router.push(`/book-hotel/${hotelId}`);
  };

  if (loading) {
    return (
      <p className="p-6 text-lg">
        Loading rooms...
      </p>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Select Your Room 🏨
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {rooms.map((room, index) => (
          <div
            key={room.id || index}
            onClick={() => selectRoom(room)}
            className={`p-5 rounded-xl shadow cursor-pointer ${
              selectedRoom?.id === room.id
                ? "border-2 border-blue-500 bg-blue-50"
                : "bg-white"
            }`}
          >
            {/* FIXED IMAGE */}
            <img
              src={
                room.imageUrl
                  ? room.imageUrl.startsWith("http")
                    ? room.imageUrl
                    : `http://localhost:8080/${room.imageUrl}`
                  : fallbackRooms[
                      index % fallbackRooms.length
                    ].imageUrl
              }
              alt={room.type || "Room"}
              className="w-full h-40 object-cover rounded"
            />

            {/* ROOM INFO */}
            <h2 className="text-xl font-bold mt-3">
              {room.type || "Standard Room"}
            </h2>

            <p className="text-lg font-semibold">
              ₹{room.price || 2500}
            </p>

            {/* PREMIUM TAG */}
            {room.price > 5000 && (
              <p className="text-purple-600">
                Premium Upgrade ⭐
              </p>
            )}

            {/* FEATURES */}
            {Array.isArray(room.features) &&
              room.features.length > 0 && (
                <div className="mt-2 text-gray-600">
                  {room.features.map(
                    (feature: string, i: number) => (
                      <p key={i}>• {feature}</p>
                    )
                  )}
                </div>
              )}

            {/* SELECTED */}
            {selectedRoom?.id === room.id && (
              <p className="text-green-600 mt-3 font-semibold">
                Selected ✅
              </p>
            )}
          </div>
        ))}
      </div>

      {/* CONTINUE BOOKING */}
      {selectedRoom && (
        <button
          onClick={continueBooking}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Continue Booking →
        </button>
      )}
    </div>
  );
}