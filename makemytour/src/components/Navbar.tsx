"use client";

import React, { useEffect, useState } from "react";
import SignupDialog from "./SignupDialog";
import {
  LogOut,
  Plane,
  User,
  Hotel,
  HomeIcon,
  Umbrella,
  Train,
  Bus,
  Car,
  CreditCard,
  Shield,
  BedDouble,
  Bell
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { clearUser } from "@/store";
import { useRouter } from "next/navigation";
import { getNotifications } from "@/lib/api";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const router = useRouter();

  const [notifications, setNotifications] = useState([]);

  const logout = () => dispatch(clearUser());

  // ✅ Dynamic notifications
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData?.id) return;

        const data = await getNotifications(userData.id);
        setNotifications(data || []);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 🔷 TOP BAR (LOGO + NOTIFICATION + USER) */}
      <div className="bg-white shadow-sm py-3 px-6 flex items-center justify-between">

        {/* LOGO */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Plane className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-bold text-black">MakeMyTour</span>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* 🔔 NOTIFICATION */}
          <div
            className="relative cursor-pointer"
            onClick={() => router.push("/notifications")}
          >
            <Bell className="w-6 h-6 text-gray-700 hover:text-blue-600" />

            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {notifications.length}
              </span>
            )}
          </div>

          {/* USER MENU */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full">
                  <Avatar>
                    <AvatarFallback>
                      {user?.firstName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <p>{user.firstName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="w-4 h-4 mr-2" /> Profile
                </DropdownMenuItem>

                <DropdownMenuItem onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <SignupDialog
              trigger={
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Sign Up
                </Button>
              }
            />
          )}
        </div>
      </div>

      {/* 🔷 MAIN NAVBAR (NO SCROLL, WRAPS CLEANLY) */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex flex-wrap justify-center gap-3">

          <Button variant="ghost" onClick={() => router.push("/flights")}>
            <Plane className="w-4 h-4 mr-1" /> Flights
          </Button>

          <Button variant="ghost" onClick={() => router.push("/hotels")}>
            <Hotel className="w-4 h-4 mr-1" /> Hotels
          </Button>

          <Button variant="ghost" onClick={() => router.push("/rooms")}>
            <BedDouble className="w-4 h-4 mr-1" /> Rooms
          </Button>

          <Button variant="ghost" onClick={() => router.push("/homestays")}>
            <HomeIcon className="w-4 h-4 mr-1" /> Homestays
          </Button>

          <Button variant="ghost" onClick={() => router.push("/holiday")}>
            <Umbrella className="w-4 h-4 mr-1" /> Holiday
          </Button>

          <Button variant="ghost" onClick={() => router.push("/trains")}>
            <Train className="w-4 h-4 mr-1" /> Trains
          </Button>

          <Button variant="ghost" onClick={() => router.push("/buses")}>
            <Bus className="w-4 h-4 mr-1" /> Buses
          </Button>

          <Button variant="ghost" onClick={() => router.push("/cabs")}>
            <Car className="w-4 h-4 mr-1" /> Cabs
          </Button>

          <Button variant="ghost" onClick={() => router.push("/forex")}>
            <CreditCard className="w-4 h-4 mr-1" /> Forex
          </Button>

          <Button variant="ghost" onClick={() => router.push("/insurance")}>
            <Shield className="w-4 h-4 mr-1" /> Insurance
          </Button>

        </div>
      </header>
    </>
  );
};

export default Navbar;