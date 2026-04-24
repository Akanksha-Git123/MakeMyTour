"use client";

import { motion } from "framer-motion";

export default function BookingCard({ booking, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-md p-5 mb-5 border hover:shadow-lg"
    >
      {/* TOP */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="text-lg font-semibold">
            {booking.fromCity} → {booking.toCity}
          </h2>
          <p className="text-gray-500 text-sm">
            {booking.airline || "Airline not available"}
          </p>
        </div>

        <span
          className={`px-3 py-1 text-sm rounded-full font-medium ${
            booking.cancelled
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {booking.cancelled ? "Cancelled" : "Confirmed"}
        </span>
      </div>

      {/* INFO */}
      <div className="flex justify-between text-sm text-gray-600 mb-3">
        <p>Flight ID: {booking.flightId}</p>
        <p className="font-semibold text-black">
          ₹{booking.bookingAmount}
        </p>
      </div>

      {/* REFUND */}
      {booking.cancelled && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-3">
          <p>
            <b>Refund:</b>{" "}
            <span className="text-green-600 font-bold">
              ₹{booking.refundAmount}
            </span>
          </p>

          <p>
            <b>Status:</b>{" "}
            <span
              className={`font-semibold ${
                booking.refundStatus === "PENDING"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {booking.refundStatus}
            </span>
          </p>

          {/* ✅ PROGRESS BAR */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Requested</span>
              <span>Processing</span>
              <span>Completed</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  booking.refundStatus === "PENDING"
                    ? "bg-yellow-500 w-1/2"
                    : "bg-green-500 w-full"
                }`}
              />
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Expected in 5–7 business days
          </p>
        </div>
      )}

      {/* ACTIONS */}
      <div className="flex gap-3 mt-4">
        {!booking.cancelled && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCancel(booking.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </motion.button>
        )}

        <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">
          View Details
        </button>
      </div>
    </motion.div>
  );
}