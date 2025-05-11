"use client";
import { useState } from "react";
import useAuthRedirect from "@/lib/useAuthRedirect";
import { useRouter } from "next/navigation";
import logoutUser from "../../logic/users/logoutUser";
import DesktopSideMenu from "./components/DesktopSideMenu";
import DesktopModulePage from "./components/DesktopModulePage";
import MobileMenu from "./components/MobileMenu";

export default function Home() {
  useAuthRedirect();
  const route = useRouter();

  const [module, setModule] = useState("Control de versiones con Git");

  const handleChangeModule = (newModule: string) => {
    setModule(newModule);
  };

  const handleLogout = () => {
    try {
      logoutUser().then(() => {
        sessionStorage.removeItem("userId");
        route.push("/login");
      });
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  };

  return (
    <main className="h-full w-full">
      <header className="flex items-center w-full h-16 pl-4 fixed bg-[var(--primary)] z-50">
        <img
          src="./logoHeader.png"
          alt="Logo de Eurofirms University"
          className="h-10 mr-4 ml-2"
        />
        <h1 className="text-xl font-semibold">Tech Academy</h1>
        <button
          className="bg-[var(--secondary)] text-white rounded-md p-2 mb-4 w-24 mt-3 font-bold ml-auto mr-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
      <section className="h-full w-full flex flex-row items-center justify-center">
        <div className="block md:hidden">
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
