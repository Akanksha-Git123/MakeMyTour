import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* ✅ TOAST */}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}