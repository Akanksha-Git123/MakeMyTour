"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const user = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (!user) return;

    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phoneNumber: user.phoneNumber || "",
    });

    setLoading(false);
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);

    try {
      const res = await fetch(
        `http://localhost:8080/user/edit?id=${user.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Failed");

      const updatedUser = await res.json();

      // Update Redux store
      dispatch({
        type: "SET_USER",
        payload: updatedUser,
      });

      alert("Profile updated successfully!");
    } catch (e) {
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (!user) return <div className="p-10 text-center">Please login.</div>;
  if (loading) return <Loader />;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 mt-10 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>

      {/* EMAIL (non-editable) */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Email</label>
        <input
          type="text"
          value={user.email}
          disabled
          className="w-full border rounded-lg p-2 bg-gray-100 cursor-not-allowed"
        />
      </div>

      {/* FIRST NAME */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">First Name</label>
        <input
          type="text"
          value={form.firstName}
          onChange={(e) =>
            setForm({ ...form, firstName: e.target.value })
          }
          className="w-full border rounded-lg p-2"
        />
      </div>

      {/* LAST NAME */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Last Name</label>
        <input
          type="text"
          value={form.lastName}
          onChange={(e) =>
            setForm({ ...form, lastName: e.target.value })
          }
          className="w-full border rounded-lg p-2"
        />
      </div>

      {/* PHONE NUMBER */}
      <div className="mb-6">
        <label className="block text-gray-600 mb-1">Phone Number</label>
        <input
          type="text"
          value={form.phoneNumber}
          onChange={(e) =>
            setForm({ ...form, phoneNumber: e.target.value })
          }
          className="w-full border rounded-lg p-2"
        />
      </div>

      <Button
        className="w-full"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}