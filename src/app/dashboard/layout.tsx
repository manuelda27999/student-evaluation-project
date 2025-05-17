"use client";

import DesktopMenu from "@/components/desktop_modules/DesktopMenu";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = () => {
      if (window.innerWidth < 768) {
        router.replace("/mobile/menu");
      }
    };

    handleRedirect();

    window.addEventListener("resize", handleRedirect);
    return () => window.removeEventListener("resize", handleRedirect);
  }, [router]);

  return (
    <main className="h-screen w-screen pt-16 overflow-hidden">
      <section className="h-full flex flex-row">
        <div className="h-full w-1/4 min-w-[420px]">
          <DesktopMenu />
        </div>
        <div className="h-full w-full overflow-y-auto">{children}</div>
      </section>
    </main>
  );
}
