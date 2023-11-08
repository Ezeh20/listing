import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar/Navbar";
import Modal from "./Components/Modal/Modal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Property",
  description: "Find any property in your desired location",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Modal isOpen title="Login" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
