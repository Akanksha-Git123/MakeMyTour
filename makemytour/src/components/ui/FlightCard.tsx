"use client";

import React from "react";
import { motion } from "framer-motion";

interface Flight {
  _id: string;
  flightName: string;
  airline?: string;
  from: string;
  to: string;
  departureTime?: string;
  arrivalTime?: string;
  price?: number;
}

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg"
    >
      {/* Flight Name */}
      <h2 className="text-xl font-bold mb-2">
        {flight.flightName}
      </h2>

      {/* Airline */}
      <p className="text-gray-500 mb-2">
        {flight.airline || "Airline not available"}
      </p>

      {/* Route */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <p className="font-semibold">{flight.from}</p>
          <p className="text-sm text-gray-500">
            {flight.departureTime || "N/A"}
          </p>
        </div>

        <div className="text-gray-400">→</div>

        <div>
          <p className="font-semibold">{flight.to}</p>
          <p className="text-sm text-gray-500">
            {flight.arrivalTime || "N/A"}
          </p>
        </div>
      </div>

      {/* Price */}
      <p className="text-lg font-bold text-green-600 mb-4">
        ₹{flight.price || 0}
      </p>

      {/* Links */}
      <div className="flex gap-4 mt-3">
        <a
          href={`/flights/${flight._id}/status`}
          className="text-blue-600 underline"
        >
          Live Status
        </a>

        <a
          href={`/flights/${flight._id}/pricing`}
          className="text-green-600 underline"
        >
          Dynamic Pricing
        </a>
      </div>
    </motion.div>
  );
}