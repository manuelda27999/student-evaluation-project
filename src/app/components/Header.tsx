"use client";

import logoutUser from "../../../logic/users/logoutUser";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

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
    <header className="">
      <div className="flex items-center w-screen h-16 px-4 fixed bg-[var(--primary)] z-50">
        <img
          src="/logoHeader.png"
          alt="Logo de Eurofirms University"
          className="h-10 mr-4 ml-2"
        />
        <h1 className="text-xl font-semibold">Tech Academy</h1>
        <div className="flex flex-col items-center justify-center ml-auto">
          {" "}
          {menuIsOpen ? (
            <button onClick={() => setMenuIsOpen(false)}>
              <img className="w-12" src="/equis.png" alt="" />
            </button>
          ) : (
            <button onClick={() => setMenuIsOpen(true)}>
              <img className="w-10" src="/menu.png" alt="" />
            </button>
          )}
        </div>
      </div>
      {menuIsOpen && (
        <ul className="bg-white h-screen w-screen fixed z-25 pt-16 flex flex-col justify-start items-center">
          <li
            className="text-black text-2xl my-3 underline"
            onClick={handleLogout}
          >
            Cerrar sesión
          </li>
        </ul>
      )}
    </header>
  );
}
