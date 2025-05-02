"use client";
import { useState } from "react";
import useAuthRedirect from "@/lib/useAuthRedirect";
import { useRouter } from "next/navigation";
import logoutUser from "../../logic/users/logoutUser";
import SideMenu from "./components/SideMenu";
import ModulePage from "./components/ModulePage";

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
        console.log("User logged out successfully");
        route.push("/login");
      });
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  };

  return (
    <main className="h-full w-full">
      <header className="flex items-center w-full h-20 pl-4 fixed bg-[var(--primary)] z-50">
        <img
          src="./logoHeader.png"
          alt="Logo de Eurofirms University"
          className="h-12 mr-8 ml-4"
        />
        <h1 className="text-3xl font-semibold">Tech Academy</h1>
        <button
          className="bg-[var(--secondary)] text-white rounded-md p-2 mb-4 w-48 mt-3 font-bold ml-auto mr-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
      <section className="h-full w-full flex flex-row items-center justify-center">
        <SideMenu onChangeModule={handleChangeModule} />
        <ModulePage module={module} />
      </section>
    </main>
  );
}
