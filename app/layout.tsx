import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar/Navbar";
import RegisterModal from "./Components/Modal/RegisterModal/RegisterModal";
import LoginModal from "./Components/Modal/LoginModal/LoginModal";
import ListingModal from "./Components/Modal/ListingModal/ListingModal";
import ToastProvider from "./Providers/ToastProvider";
import { getCurrentUser } from "./actions/getCurrentUser";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Property",
  description: "Find any property in your desired location",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={poppins.className}>
        <ToastProvider />
        <RegisterModal />
        <LoginModal />
        <ListingModal />
        <Navbar currentUser={currentUser} />
        <div className=" pt-10 pb-20">{children}</div>
      </body>
    </html>
  );
}
