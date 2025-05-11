import React, { useEffect, useState } from "react";

interface Module {
  name: string;
}

export default function DesktopSideMenu(props: {
  onChangeModule: (module: string) => void;
}) {
  const [course, setCourse] = useState("Bootcamp Desarrollo Web");
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    setModules([
      { name: "Programación en un lenguaje elemental" },
      { name: "Control de versiones con Git" },
      { name: "Programación en JavaScript" },
      { name: "Desarrollo de páginas web" },
      { name: "Diseño gráfico y creación de interfaces" },
      { name: "Manipulación del DOM con JavaScript" },
      { name: "Consumo de APIs y manipulación de datos con Local Storage" },
      { name: "Fundamentos de backend con JavaScript" },
      { name: "Desarrollo de proyecto Full Stack" },
    ]);
  }, []);

  return (
    <div className="w-1/5 h-full flex flex-col items-center justify-start border-r-4 border-[var(--primary)] bg-white pt-20 min-w-sm">
      <div className="w-full flex flex-col items-center justify-start border-b-4 border-[var(--primary)] pb-3">
        <h2 className="text-black text-2xl py-3 font-bold  w-full text-center">
          {course}
        </h2>
        <p className="text-red-700 mb-3">
          Autoevaluación del alumno: Aceptable
        </p>
        <p className="text-blue-700">Evaluación del profesor: Muy bien</p>
      </div>

      <ul className="w-full flex flex-col items-center justify-center">
        {modules.length > 0 &&
          modules.map((oneModule) => {
            return (
              <li
                className="text-black h-fit px-3 py-6 w-full flex flex-col items-center justify-between hover:bg-[var(--primary)] hover:text-white cursor-pointer"
                key={oneModule.name}
                onClick={() => {
                  props.onChangeModule(oneModule.name);
                }}
              >
                <p className="w-fit text-xl text-center">{oneModule.name}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
