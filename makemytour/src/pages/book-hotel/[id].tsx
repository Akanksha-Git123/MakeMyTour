"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getHotels } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function BookHotel() {
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

  const handleBooking = () => {
    const room = JSON.parse(
      localStorage.getItem("selectedRoom") || "{}"
    );

    const existingBookings = JSON.parse(
      localStorage.getItem("hotelBookings") || "[]"
    );

    const newBooking = {
      id: Date.now().toString(),
      hotelName: hotel.hotelName,
      location: hotel.location,
      roomType: room.type,
      bookingAmount: room.price || hotel.pricePerNight,
      bookingDate: new Date().toLocaleDateString(),
    };

    localStorage.setItem(
      "hotelBookings",
      JSON.stringify([
        ...existingBookings,
        newBooking,
      ])
    );

    alert("Hotel booked successfully!");
    router.push("/dashboard/hotel-trips");
  };

  if (!hotel) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={hotel.imageUrl}
        className="w-full h-64 object-cover rounded"
      />

      <h1 className="text-3xl font-bold mt-4">
        {hotel.hotelName}
      </h1>

      <p>📍 {hotel.location}</p>

      <Button
        className="w-full mt-6"
        onClick={handleBooking}
      >
        Confirm Booking
      </Button>
    </div>
  );
}