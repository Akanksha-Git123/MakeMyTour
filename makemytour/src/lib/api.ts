// ======================================================
// BASE URL
// ======================================================
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL + "/api";
// ======================================================
// GENERIC HELPERS
// ======================================================
async function handleResponse(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API request failed");
  }

  const text = await res.text();

  try {
    return JSON.parse(text); // 🔥 FIX: handle string JSON
  } catch {
    return text;
  }
}

// ✅ Disable caching (IMPORTANT for real-time feel)
async function apiGet(url: string) {
  const res = await fetch(`${API_BASE}${url}`, {
    cache: "no-store",
  });
  return handleResponse(res);
}

// ✅ POST
async function apiPost(url: string) {
  const res = await fetch(`${API_BASE}${url}`, {
    method: "POST",
  });
  return handleResponse(res);
}

// ✅ PUT
async function apiPut(url: string, body: any = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
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
  return fetch(`${API_BASE}/user/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    }),
  }).then(handleResponse);
}

export async function login(email: string, password: string) {
  return fetch(`${API_BASE}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

export async function getUserByEmail(email: string) {
  return apiGet(`/user/email?email=${email}`);
}

// ======================================================
// FLIGHTS
// ======================================================
export async function getAllFlights() {
  return apiGet(`/flights`);
}

// 🔥 REAL SEARCH
export async function searchRealFlights(from: string, to: string) {
  return apiGet(`/live/search?from=${from}&to=${to}`);
}

// 🔥 FIXED LIVE STATUS
export async function getLiveStatus(flightId: string) {
  const res = await fetch(`${API_BASE}/live/status/${flightId}`, {
    cache: "no-store",
  });

  const text = await res.text();

  try {
    return JSON.parse(text); // 🔥 FORCE PARSE
  } catch {
    return {};
  }
}

// ======================================================
// BOOKINGS
// ======================================================
export async function createBooking(data: any) {
  if (!data.bookingAmount || data.bookingAmount <= 0) {
    throw new Error("Invalid booking amount");
  }

  return fetch(`${API_BASE}/bookings/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export async function getUserBookings(email: string) {
  return apiGet(`/bookings/user/${encodeURIComponent(email)}`);
}

export async function cancelBooking(id: string, reason: string) {
  if (!reason) throw new Error("Cancellation reason is required");
  return apiPut(`/bookings/cancel/${id}`, { reason });
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
// DYNAMIC PRICING
// ======================================================
export async function getDynamicPrice(flightId: string) {
  return apiGet(`/pricing/${flightId}`);
}

export async function getPriceHistory(flightId: string) {
  return apiGet(`/pricing/history/${flightId}`);
}

// 🔥 FIXED FREEZE (BACKEND CALL)
export async function freezePrice(flightId: string) {
  return apiPost(`/pricing/freeze/${flightId}`);
}

// ======================================================
// HOTELS
// ======================================================
export async function getHotels() {
  return apiGet(`/hotels`);
}

// ======================================================
// 🔔 NOTIFICATIONS
// ======================================================
export async function getNotifications(userId: string) {
  return apiGet(`/notifications/${userId}`);
}

export async function sendNotification(userId: string, message: string) {
  return apiPost(
    `/notifications/send?userId=${userId}&message=${encodeURIComponent(message)}`
  );
}

// 🔥 AUTO TRIGGER
export async function triggerFlightUpdates(flightId: string) {
  return getLiveStatus(flightId);
}



import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
});

export default api;


// Flights
export const getflight = () => api.get("/flights");

export const addflight = (data: any) =>
  api.post("/flights", data);

export const editflight = (id: string, data: any) =>
  api.put(`/flights/${id}`, data);


// Hotels
export const gethotel = () => api.get("/hotels");

export const addhotel = (data: any) =>
  api.post("/hotels", data);

export const edithotel = (id: string, data: any) =>
  api.put(`/hotels/${id}`, data);


// Users
export const getuserbyemail = (email: string) =>
  api.get(`/users/${email}`);


// Seats
export const getSeatsByFlight = (flightId: string) =>
  api.get(`/seats/${flightId}`);