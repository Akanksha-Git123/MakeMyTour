"use client";

import { useState } from "react";

export default function AddHotel() {
  const [form, setForm] = useState({
    hotelName: "",
    location: "",
    pricePerNight: "",
    imageUrl: "",
    description: "",
    amenities: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch("http://localhost:8080/admin/hotel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Hotel Added Successfully!");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-4">Add Hotel</h1>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          placeholder={key}
          className="my-2 p-2 border w-full rounded"
          onChange={handleChange}
        />
      ))}

      <button
        className="bg-blue-600 text-white p-2 rounded w-full mt-3"
        onClick={handleSubmit}
      >
        Add Hotel
      </button>
    </div>
  );
}