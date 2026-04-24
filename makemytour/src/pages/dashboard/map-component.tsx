"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface MapComponentProps {
  lat: number;
  lon: number;
  flight: string;
}

export default function MapComponent({
  lat,
  lon,
  flight,
}: MapComponentProps) {
  const [icon, setIcon] = useState<any>(null);

  useEffect(() => {
    const loadLeaflet = async () => {
      const L = await import("leaflet");

      const customIcon = L.icon({
        iconUrl:
          "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [35, 35],
      });

      setIcon(customIcon);
    };

    loadLeaflet();
  }, []);

  if (!lat || !lon || !icon) return null;

  return (
    <div className="h-64 w-full mt-3 rounded overflow-hidden border">
      <MapContainer
        center={[lat, lon]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[lat, lon]} icon={icon}>
          <Popup>✈ {flight}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}