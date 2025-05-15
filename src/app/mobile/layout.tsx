"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = () => {
      if (window.innerWidth > 768) {
        router.replace("/dashboard/average");
      }
    };

    handleRedirect();

    window.addEventListener("resize", handleRedirect);
    return () => window.removeEventListener("resize", handleRedirect);
  }, [router]);

  return <main className="h-screen w-screen pt-16">{children}</main>;
}
