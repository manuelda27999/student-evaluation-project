"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePopup } from "@/context/PopupContext";
import logoutUser from "../../logic/users/logoutUser";

export default function Header() {
  const route = useRouter();
  const { openPopup } = usePopup();

  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const handleOpenTutorial = () => {
    openPopup(
      "Tutorial inicial",
      "👋 ¡Bienvenido al tutorial inicial de la aplicación de evaluaciones!\n\nAquí los profesores valorarán tu desempeño durante la formación y te darán feedback para que sigas mejorando. 📈\n\nEn la primera sección podrás acceder al resumen del curso. Después, avanzarás por los módulos uno por uno.\n\n✅ Los tics indican si un módulo ya tiene su autoevaluación o la evaluación del profesor completada.\n\n🔒 Recuerda: para ver la evaluación del profesor, primero debes completar tu autoevaluación."
    );
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
    <header className="w-screen">
      <div className="flex items-center w-full h-16 px-4 fixed bg-[var(--secondary)] z-50">
        <img
          src="/logoHeader.png"
          alt="Logo de Eurofirms University"
          className="h-10 mr-4"
        />
        <h1 className="text-xl font-semibold">Tech Academy</h1>
        <div className="flex flex-col items-center justify-center ml-auto pl-4">
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
        <ul className="bg-white h-screen w-screen fixed z-25 pt-18 flex flex-col justify-start items-center">
          <li
            className="text-black text-2xl my-3 underline"
            onClick={handleOpenTutorial}
          >
            Tutorial inicial
          </li>
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
