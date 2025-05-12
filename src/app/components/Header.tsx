"use client";

import logoutUser from "../../../logic/users/logoutUser";
import { useRouter } from "next/navigation";

export default function Header() {
  const route = useRouter();

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
    <header className="flex items-center w-full h-16 pl-4 fixed bg-[var(--primary)] z-50">
      <img
        src="/logoHeader.png"
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
  );
}
