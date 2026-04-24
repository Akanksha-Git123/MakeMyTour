// ======================================================
// BASE URL
// ======================================================
import axios from "axios";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// ======================================================
// AXIOS INSTANCE
// ======================================================
const api = axios.create({
  baseURL: API_BASE,
});

export default api;

// ======================================================
// GENERIC HELPERS (for fetch APIs)
// ======================================================
async function handleResponse(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API request failed");
  }

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function apiGet(url: string) {
  const res = await fetch(`${API_BASE}${url}`, {
    cache: "no-store",
  });
  return handleResponse(res);
}

async function apiPost(url: string, body: any = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

async function apiPut(url: string, body: any = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

// ======================================================
// AUTH
// ======================================================
export async function signup(
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string
) {
  return apiPost("/user/signup", {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
  });
}

export async function login(email: string, password: string) {
  return apiPost("/user/login", {
    email,
    password,
  });
}

export async function getUserByEmail(email: string) {
  return apiGet(`/user/email?email=${email}`);
}

// OLD naming support (for admin page)
export const getuserbyemail = (email: string) =>
  api.get(`/users/${email}`);

// ======================================================
// FLIGHTS
// ======================================================
export async function getAllFlights() {
  return apiGet("/flights");
}

export async function searchRealFlights(from: string, to: string) {
  return apiGet(`/live/search?from=${from}&to=${to}`);
}

export async function getLiveStatus(flightId: string) {
  return apiGet(`/live/status/${flightId}`);
}

// OLD naming support (for admin page)
export const getflight = () => api.get("/flights");

export const addflight = (data: any) =>
  api.post("/flights", data);

export const editflight = (id: string, data: any) =>
  api.put(`/flights/${id}`, data);

// ======================================================
// HOTELS
// ======================================================
export async function getHotels() {
  return apiGet("/hotels");
}

// OLD naming support
export const gethotel = () => api.get("/hotels");

export const addhotel = (data: any) =>
  api.post("/hotels", data);

export const edithotel = (id: string, data: any) =>
  api.put(`/hotels/${id}`, data);

// ======================================================
// BOOKINGS
// ======================================================
export async function createBooking(data: any) {
  return apiPost("/bookings/create", data);
}

export async function getUserBookings(email: string) {
  return apiGet(`/bookings/user/${encodeURIComponent(email)}`);
}

export async function cancelBooking(id: string, reason: string) {
  return apiPut(`/bookings/cancel/${id}`, {
    reason,
  });
}

export async function getRefundStatus(id: string) {
  return apiGet(`/bookings/refund-status/${id}`);
}

// ======================================================
// ROOMS
// ======================================================
export async function getRoomsByHotel(hotelId: string) {
  return apiGet(`/rooms/${hotelId}`);
}

// ======================================================
// PRICING
// ======================================================
export async function getDynamicPrice(flightId: string) {
  return apiGet(`/pricing/${flightId}`);
}

export async function getPriceHistory(flightId: string) {
  return apiGet(`/pricing/history/${flightId}`);
}

export async function freezePrice(flightId: string) {
  return apiPost(`/pricing/freeze/${flightId}`);
}

// ======================================================
// SEATS
// ======================================================
export const getSeatsByFlight = (flightId: string) =>
  api.get(`/seats/${flightId}`);

// ======================================================
// NOTIFICATIONS
// ======================================================
export async function getNotifications(userId: string) {
  return apiGet(`/notifications/${userId}`);
}

export async function sendNotification(
  userId: string,
  message: string
) {
  return apiPost("/notifications/send", {
    userId,
    message,
  });
}

export async function triggerFlightUpdates(
  flightId: string
) {
  return getLiveStatus(flightId);
}