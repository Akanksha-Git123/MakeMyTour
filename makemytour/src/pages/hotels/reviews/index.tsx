import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ReviewsHome() {
  const router = useRouter();
  const [hotels, setHotels] = useState<any[]>([]);

  async function loadHotels() {
    const res = await fetch("http://localhost:8080/api/hotels");
    const data = await res.json();
    setHotels(data);
  }

  useEffect(() => {
    loadHotels();
  }, []);

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">
        Choose Hotel to View Reviews
      </h1>

      {hotels.map((hotel: any) => (
        <div
          key={hotel.id}
          className="border p-4 rounded mb-4 cursor-pointer hover:bg-gray-100"
          onClick={() => router.push(`/hotels/reviews/${hotel.id}`)}
        >
          <h2 className="text-xl font-semibold">
            {hotel.name || hotel.hotelName}
          </h2>

          <p className="text-gray-500">
            {hotel.city || hotel.location}
          </p>

          <p className="text-sm text-blue-500">
            Click to view reviews
          </p>
        </div>
      ))}
    </div>
  );
}