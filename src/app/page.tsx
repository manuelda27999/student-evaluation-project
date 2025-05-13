"use client";
import { useEffect, useState } from "react";
import useAuthRedirect from "@/lib/useAuthRedirect";
import DesktopSideMenu from "../components/DesktopSideMenu";
import DesktopModulePage from "../components/DesktopModulePage";
import MobileMenu from "../components/MobileMenu";

export default function Home() {
  useAuthRedirect();

  useEffect(() => {
    sessionStorage.setItem("courseId", "uytEidnU3GVsyhNcpbmc");
  }, []);

  const [module, setModule] = useState("Control de versiones con Git");

  const handleChangeModule = (newModule: string) => {
    setModule(newModule);
  };

  return (
    <main className="h-full w-screen pt-16">
      <section className="h-full w-full flex flex-row items-start justify-center">
        <div className="block md:hidden w-full">
          <MobileMenu />
        </div>
        <div className="hidden md:flex h-full w-full flex-row items-center justify-center">
          <DesktopSideMenu onChangeModule={handleChangeModule} />
          <DesktopModulePage module={module} />
        </div>
      </section>
    </main>
  );
}
