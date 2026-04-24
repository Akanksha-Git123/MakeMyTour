"use client";

import { getHotels } from "@/lib/api";
import Loader from "@/components/Loader";
import { SearchSelect } from "@/components/SearchSelect";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [to, setto] = useState("");
  const [date, setdate] = useState("");

  const [searchresults, setsearchresult] = useState<any[]>([]);
  const [hotel, sethotel] = useState<any[]>([]);
  const [loading, setloading] = useState(true);

  const [recommendations, setRecommendations] = useState<any>(null);

  const router = useRouter();
  const userId = "user123";

  // Use environment variable instead of localhost
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  useEffect(() => {
    const fetchdata = async () => {
      try {
        // Fetch hotels
        const hotels = await getHotels();
        sethotel(Array.isArray(hotels) ? hotels : []);

        // Fetch recommendations safely
        try {
          const res = await fetch(
            `${API_URL}/api/recommendations/${userId}`
          );

          if (res.ok) {
            const data = await res.json();
            setRecommendations(data);
          }
        } catch (err) {
          console.log("Recommendation API failed:", err);
        }
      } catch (e) {
        console.log("Hotel API error:", e);
      } finally {
        setloading(false);
      }
    };

    fetchdata();
  }, []);

  const cityOptions = useMemo(() => {
    const cities = new Set<string>();

    hotel.forEach((h: any) => {
      if (h.location) cities.add(h.location);
    });

    return Array.from(cities).map((c) => ({
      value: c,
      label: c,
    }));
  }, [hotel]);

  if (loading) return <Loader />;

  const handlesearch = () => {
    const results = hotel.filter(
      (h: any) =>
        h.location?.toLowerCase() === to.toLowerCase()
    );

    setsearchresult(results);
  };

  const handlebooknow = (id: any) => {
    router.push(`/book-hotel/${id}`);
  };

  async function sendFeedback(
    hotelId: string,
    helpful: boolean
  ) {
    try {
      const res = await fetch(
        `${API_URL}/api/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            hotelId,
            helpful,
          }),
        }
      );

      if (res.ok) {
        alert("Feedback saved");
      } else {
        alert("Failed to save feedback");
      }
    } catch (error) {
      console.log(error);
      alert("Feedback API failed");
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1464037866556-6812c9d1c72e")',
      }}
    >
      <main className="container mx-auto px-4 py-6">
        
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg max-w-5xl mx-auto mb-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SearchSelect
              options={cityOptions}
              placeholder="Where are you going?"
              value={to}
              onChange={setto}
              icon={<MapPin />}
            />

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setdate(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <Button onClick={handlesearch}>
              SEARCH
            </Button>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations &&
          recommendations.hotels?.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg max-w-5xl mx-auto mb-6 p-6">
              <h2 className="text-2xl font-bold">
                🔥 Recommended for You
              </h2>

              <p className="text-gray-500 mb-4">
                {recommendations.reason}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.hotels
                  .slice(0, 3)
                  .map((h: any) => (
                    <div
                      key={h.id}
                      className="border rounded-lg overflow-hidden shadow"
                    >
                      <img
                        src={
                          h.imageUrl ||
                          "https://via.placeholder.com/300"
                        }
                        className="w-full h-40 object-cover"
                        alt={h.hotelName}
                      />

                      <div className="p-3">
                        <h3 className="font-bold">
                          {h.hotelName}
                        </h3>

                        <p className="text-gray-500">
                          {h.location}
                        </p>

                        <p className="font-bold">
                          ₹{h.pricePerNight}
                        </p>

                        <div className="flex justify-between mt-2">
                          <Button
                            onClick={() =>
                              handlebooknow(h.id)
                            }
                          >
                            Book
                          </Button>

                          <div>
                            <button
                              onClick={() =>
                                sendFeedback(
                                  h.id,
                                  true
                                )
                              }
                            >
                              👍
                            </button>

                            <button
                              onClick={() =>
                                sendFeedback(
                                  h.id,
                                  false
                                )
                              }
                            >
                              👎
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

        {/* Hotels */}
        <div className="bg-white rounded-xl shadow-lg max-w-5xl mx-auto mb-6 p-6">
          <h2 className="text-xl font-bold mb-4">
            🏨 Explore Hotels
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hotel.slice(0, 6).map((h: any) => (
              <div
                key={h.id}
                className="border rounded-lg overflow-hidden shadow"
              >
                <img
                  src={
                    h.imageUrl ||
                    "https://via.placeholder.com/300"
                  }
                  className="w-full h-40 object-cover"
                  alt={h.hotelName}
                />

                <div className="p-3">
                  <h3 className="font-semibold">
                    {h.hotelName}
                  </h3>

                  <p className="text-gray-500">
                    {h.location}
                  </p>

                  <p className="font-bold">
                    ₹{h.pricePerNight}
                  </p>

                  <Button
                    className="w-full mt-2"
                    onClick={() =>
                      handlebooknow(h.id)
                    }
                  >
                    Book
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Results */}
        <div className="max-w-5xl mx-auto">
          {searchresults.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {searchresults.map((r: any) => (
                <div
                  key={r.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <img
                    src={
                      r.imageUrl ||
                      "https://via.placeholder.com/300"
                    }
                    className="h-32 w-full object-cover"
                    alt={r.hotelName}
                  />

                  <div className="p-3">
                    <h3>{r.hotelName}</h3>
                    <p>{r.location}</p>
                    <p>₹{r.pricePerNight}</p>

                    <Button
                      onClick={() =>
                        handlebooknow(r.id)
                      }
                    >
                      Book
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}