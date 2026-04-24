import type { Metadata } from "./next";
import { ReactNode } from "./react";
import { Toaster } from "./react-hot-toast";

export const metadata: Metadata = {
  title: "Make My Tour",
  description: "Travel booking platform",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
