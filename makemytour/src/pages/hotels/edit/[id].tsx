"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function EditHotel() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    hotelName: "",
    location: "",
    pricePerNight: "",
    availableRooms: "",
    imageUrl: "",
    description: "",
    amenities: "",
  });

  const [loading, setLoading] = useState(true);

  // Load hotel data
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8080/api/hotels`)
      .then((res) => res.json())
      .then((data) => {
        const hotel = data.find((h: any) => h.id === id);
        if (hotel) {
          setForm({
            hotelName: hotel.hotelName || "",
            location: hotel.location || "",
            pricePerNight: hotel.pricePerNight || "",
            availableRooms: hotel.availableRooms || "",
            imageUrl: hotel.imageUrl || "",
            description: hotel.description || "",
            amenities: hotel.amenities || "",
          });
        }
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:8080/admin/hotel/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Hotel updated successfully!");
      router.push("/hotels/list");
    } else {
      alert("Failed to update hotel");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-4">Edit Hotel</h1>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          value={(form as any)[key]}
          placeholder={key}
          className="my-2 p-2 border w-full rounded"
          onChange={handleChange}
        />
      ))}

      <Button className="mt-4 w-full" onClick={handleUpdate}>
        Update Hotel
      </Button>
    </div>
  );
}