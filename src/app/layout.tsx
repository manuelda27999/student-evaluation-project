import type { Metadata } from "next";
import "./globals.css";
import HeaderWrapper from "./components/HeaderWrapper";

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
        <HeaderWrapper />
        {children}
      </body>
    </html>
  );
}
