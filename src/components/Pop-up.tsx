"use client";

import { usePopup } from "@/context/PopupContext";

export default function Popup() {
  const { showPopup, title, content, closePopup } = usePopup();

  if (!showPopup) return null;

  return (
    <div className="fixed top-0 left-0 z-[9999] w-full h-full flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-70"></div>

      <div className="relative bg-white rounded-lg w-11/12 p-6 max-w-md shadow-lg text-black">
        <button
          className="absolute top-2 right-3 text-4xl font-bold text-gray-600 hover:text-black cursor-pointer"
          onClick={closePopup}
          aria-label="Cerrar"
        >
          ×
        </button>
        <div>
          <h2 className="text-3xl text-black mb-2 underline">{title}</h2>
        </div>
        <div>
          {content.split("\n").map((line, i) => (
            <p key={i} className="text-lg mb-2">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
