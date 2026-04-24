import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format dates cleanly
export function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString();
}
