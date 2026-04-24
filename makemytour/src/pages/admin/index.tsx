"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
import FlightList from "@/components/Flights/Flightlist";
import HotelList from "@/components/Hotel/Hotel";

import {
  addflight,
  addhotel,
  editflight,
  edithotel,
  getUserByEmail,
} from "../../lib/api";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
}

function UserSearch() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await getUserByEmail(email);
      const userData = response.data || response;
      setUser(userData);
    } catch (error) {
      console.log(error);
      alert("User not found");
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="email"
          placeholder="Search user by email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Search</Button>
      </form>

      {user && (
        <div className="border p-4 rounded-md">
          <h3 className="font-bold mb-2">User Details</h3>
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Phone:</strong> {user.phoneNumber}</p>
        </div>
      )}
    </div>
  );
}

interface Hotel {
  id?: string;
  hotelName: string;
  location: string;
  pricePerNight: number;
  availableRooms: number;
  amenities: string;
}

function AddEditHotel({ hotel }: { hotel: Hotel | null }) {
  const [formData, setFormData] = useState<Hotel>({
    hotelName: "",
    location: "",
    pricePerNight: 0,
    availableRooms: 0,
    amenities: "",
  });

  useEffect(() => {
    if (hotel) {
      setFormData(hotel);
    }
  }, [hotel]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "pricePerNight" || name === "availableRooms"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (hotel?.id) {
        await edithotel(hotel.id, formData);
      } else {
        await addhotel(formData);
      }

      alert("Hotel saved successfully");

      setFormData({
        hotelName: "",
        location: "",
        pricePerNight: 0,
        availableRooms: 0,
        amenities: "",
      });
    } catch (error) {
      console.log(error);
      alert("Error saving hotel");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">
        {hotel ? "Edit Hotel" : "Add Hotel"}
      </h3>

      <Input
        name="hotelName"
        placeholder="Hotel Name"
        value={formData.hotelName}
        onChange={handleChange}
      />

      <Input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />

      <Input
        name="pricePerNight"
        type="number"
        placeholder="Price Per Night"
        value={formData.pricePerNight}
        onChange={handleChange}
      />

      <Input
        name="availableRooms"
        type="number"
        placeholder="Available Rooms"
        value={formData.availableRooms}
        onChange={handleChange}
      />

      <Textarea
        name="amenities"
        placeholder="Amenities"
        value={formData.amenities}
        onChange={handleChange}
      />

      <Button type="submit">
        {hotel ? "Update Hotel" : "Add Hotel"}
      </Button>
    </form>
  );
}

interface Flight {
  id?: string;
  flightName: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
}

function AddEditFlight({ flight }: { flight: Flight | null }) {
  const [formData, setFormData] = useState<Flight>({
    flightName: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    price: 0,
    availableSeats: 0,
  });

  useEffect(() => {
    if (flight) {
      setFormData(flight);
    }
  }, [flight]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "availableSeats"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (flight?.id) {
        await editflight(flight.id, formData);
      } else {
        await addflight(formData);
      }

      alert("Flight saved successfully");

      setFormData({
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
      alert("Error saving flight");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">
        {flight ? "Edit Flight" : "Add Flight"}
      </h3>

      <Input
        name="flightName"
        placeholder="Flight Name"
        value={formData.flightName}
        onChange={handleChange}
      />

      <Input
        name="from"
        placeholder="From"
        value={formData.from}
        onChange={handleChange}
      />

      <Input
        name="to"
        placeholder="To"
        value={formData.to}
        onChange={handleChange}
      />

      <Input
        name="departureTime"
        type="datetime-local"
        value={formData.departureTime}
        onChange={handleChange}
      />

      <Input
        name="arrivalTime"
        type="datetime-local"
        value={formData.arrivalTime}
        onChange={handleChange}
      />

      <Input
        name="price"
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />

      <Input
        name="availableSeats"
        type="number"
        placeholder="Available Seats"
        value={formData.availableSeats}
        onChange={handleChange}
      />

      <Button type="submit">
        {flight ? "Update Flight" : "Add Flight"}
      </Button>
    </form>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("flights");
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="flights">Flights</TabsTrigger>
          <TabsTrigger value="hotels">Hotels</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="flights">
          <Card>
            <CardHeader>
              <CardTitle>Manage Flights</CardTitle>
              <CardDescription>
                Add/Edit flights here
              </CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4">
              <FlightList onSelect={setSelectedFlight} />
              <AddEditFlight flight={selectedFlight} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hotels">
          <Card>
            <CardHeader>
              <CardTitle>Manage Hotels</CardTitle>
              <CardDescription>
                Add/Edit hotels here
              </CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4">
              <HotelList onSelect={setSelectedHotel} />
              <AddEditHotel hotel={selectedHotel} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Search users by email
              </CardDescription>
            </CardHeader>

            <CardContent>
              <UserSearch />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}