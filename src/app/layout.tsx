import type { Metadata } from "next";
import "./globals.css";
import HeaderWrapper from "../components/HeaderWrapper";
import { PopupProvider } from "@/context/PopupContext";
import Popup from "@/components/Pop-up";

export const metadata: Metadata = {
  title: "Tech Academy Evaluation",
  description: "Check your calification and your progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen">
        <PopupProvider>
          <HeaderWrapper />
          {children}
          <Popup />
        </PopupProvider>
      </body>
    </html>
  );
}
