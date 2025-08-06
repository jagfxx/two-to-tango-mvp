import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

// Cargar las fuentes como variables CSS
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata para el sitio
export const metadata = {
  title: "Two to Tango",
  description: "Simplified event platform for connecting people.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        {/* Navbar solo debe ir dentro del body */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}

