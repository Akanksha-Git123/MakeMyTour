"use client";

import { useState, useEffect } from "react";
import {
  getflight,
  gethotel,
  getuserbyemail,
  addflight,
  editflight,
  addhotel,
  edithotel,
} from "../../lib/api";

import FlightList from "../../components/Flights/Flightlist";
import HotelList from "../../components/Hotel/Hotel";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface Hotel {
  _id?: string;
  hotelName: string;
  location: string;
  pricePerNight: number;
  availableRooms: number;
  amenities: string;
}

interface Flight {
  _id?: string;
  flightName: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
}

export default function AdminDashboard() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const [hotelForm, setHotelForm] = useState<Hotel>({
    hotelName: "",
    location: "",
    pricePerNight: 0,
    availableRooms: 0,
    amenities: "",
  });

  const [flightForm, setFlightForm] = useState<Flight>({
    flightName: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    price: 0,
    availableSeats: 0,
  });

  useEffect(() => {
    if (selectedHotel) {
      setHotelForm(selectedHotel);
    }
  }, [selectedHotel]);

  useEffect(() => {
    if (selectedFlight) {
      setFlightForm(selectedFlight);
    }
  }, [selectedFlight]);

  // Search User
  const handleSearchUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await getuserbyemail(email);
      setUser(response.data);
    } catch (error) {
      console.log(error);
      alert("User not found");
    }
  };

  // Hotel Submit
  const handleHotelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (selectedHotel?._id) {
        await edithotel(selectedHotel._id, hotelForm);
        alert("Hotel updated successfully");
      } else {
        await addhotel(hotelForm);
        alert("Hotel added successfully");
      }

      setHotelForm({
        hotelName: "",
        location: "",
        pricePerNight: 0,
        availableRooms: 0,
        amenities: "",
      });
    } catch (error) {
      console.log(error);
      alert("Hotel operation failed");
    }
  };

  // Flight Submit
  const handleFlightSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (selectedFlight?._id) {
        await editflight(selectedFlight._id, flightForm);
        alert("Flight updated successfully");
      } else {
        await addflight(flightForm);
        alert("Flight added successfully");
      }

      setFlightForm({
        flightName: "",
        from: "",
        to: "",
        departureTime: "",
        arrivalTime: "",
        price: 0,
        availableSeats: 0,
      });
    } catch (error) {
      console.log(error);
      alert("Flight operation failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {/* User Search */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Search User</h2>
        <form onSubmit={handleSearchUser}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {user && (
          <div>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        )}
      </div>

      {/* Hotel Section */}
      <div style={{ marginBottom: "30px" }}>
        <h2>Manage Hotels</h2>

        <HotelList onSelect={setSelectedHotel} />

        <form onSubmit={handleHotelSubmit}>
          <input
            type="text"
            placeholder="Hotel Name"
            value={hotelForm.hotelName}
            onChange={(e) =>
              setHotelForm({ ...hotelForm, hotelName: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Location"
            value={hotelForm.location}
            onChange={(e) =>
              setHotelForm({ ...hotelForm, location: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Price"
            value={hotelForm.pricePerNight}
            onChange={(e) =>
              setHotelForm({
                ...hotelForm,
                pricePerNight: Number(e.target.value),
              })
            }
          />

          <input
            type="number"
            placeholder="Rooms"
            value={hotelForm.availableRooms}
            onChange={(e) =>
              setHotelForm({
                ...hotelForm,
                availableRooms: Number(e.target.value),
              })
            }
          />

          <textarea
            placeholder="Amenities"
            value={hotelForm.amenities}
            onChange={(e) =>
              setHotelForm({
                ...hotelForm,
                amenities: e.target.value,
              })
            }
          />

          <button type="submit">
            {selectedHotel ? "Update Hotel" : "Add Hotel"}
          </button>
        </form>
      </div>

      {/* Flight Section */}
      <div>
        <h2>Manage Flights</h2>

        <FlightList onSelect={setSelectedFlight} />

        <form onSubmit={handleFlightSubmit}>
          <input
            type="text"
            placeholder="Flight Name"
            value={flightForm.flightName}
            onChange={(e) =>
              setFlightForm({
                ...flightForm,
                flightName: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="From"
            value={flightForm.from}
            onChange={(e) =>
              setFlightForm({
                ...flightForm,
                from: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="To"
            value={flightForm.to}
            onChange={(e) =>
              setFlightForm({
                ...flightForm,
                to: e.target.value,
              })
            }
          />

          <input
            type="datetime-local"
            value={flightForm.departureTime}
            onChange={(e) =>
              setFlightForm({
                ...flightForm,
                departureTime: e.target.value,
              })
            }
          />

          <input
            type="datetime-local"
            value={flightForm.arrivalTime}
            onChange={(e) =>
              setFlightForm({
                ...flightForm,
                arrivalTime: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Price"
            value={flightForm.price}
            onChange={(e) =>
              setFlightForm({
                ...flightForm,
                price: Number(e.target.value),
              })
            }
          />

          <input
            type="number"
            placeholder="Seats"
            value={flightForm.availableSeats}
            onChange={(e) =>
              setFlightForm({
                ...flightForm,
                availableSeats: Number(e.target.value),
              })
            }
          />

          <button type="submit">
            {selectedFlight ? "Update Flight" : "Add Flight"}
          </button>
        </form>
      </div>
    </div>
  );
}