"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePopup } from "@/context/PopupContext";
import getModules from "../../../../logic/course-modules/getModules";
import getNameOfCourse from "../../../../logic/courses/getNameOfCourse";

interface Module {
  name: string;
  selfEvaluation: boolean;
  teacherEvaluation: boolean;
}

export default function MobileMenu() {
  const router = useRouter();
  const { openPopup } = usePopup();

  const [courseName, setCourseName] = useState<string | null>(null);
  const [modules, setModules] = useState<Module[]>([]);

  const handleGetModules = async (course: string) => {
    try {
      const userId = sessionStorage.getItem("userId");

      if (typeof userId === "string") {
        const modules = await getModules(userId, course);

        setModules(modules);
      }
    } catch (error) {
      console.error("Error getting modules:", error);
    }
  };

  const handleGetCourseName = async (courseId: string) => {
    try {
      const courseName = await getNameOfCourse(courseId);
      setCourseName(courseName);
    } catch (error) {
      console.error("Error getting course name:", error);
    }
  };

  useEffect(() => {
    const courseId = sessionStorage.getItem("courseId") as string;

    handleGetModules(courseId);
    handleGetCourseName(courseId);

    const tutorialDone = localStorage.getItem("tutorialDone");
    if (!tutorialDone) {
      openPopup(
        "Tutorial inicial",
        "👋 ¡Bienvenido al tutorial inicial de la aplicación de evaluaciones!\n\nAquí los profesores valorarán tu desempeño durante la formación y te darán feedback para que sigas mejorando. 📈\n\nEn la primera sección podrás acceder al resumen del curso. Después, avanzarás por los módulos uno por uno.\n\n✅ Los tics indican si un módulo ya tiene su autoevaluación o la evaluación del profesor completada.\n\n🔒 Recuerda: para ver la evaluación del profesor, primero debes completar tu autoevaluación."
      );
      localStorage.setItem("tutorialDone", "true");
    }
  }, []);

  return (
    <div className=" h-full flex flex-col items-center justify-start bg-white">
      <div className="bg-[var(--primary)] w-full h-16 flex flex-row items-center justify-center fixed top-16">
        <h1 className=" text-2xl text-white font-bold">{courseName}</h1>
      </div>

      <ul className="w-full flex flex-col items-center justify-start mt-16">
        <li
          className="text-black h-fit py-4 px-2 flex flex-row items-center justify-center hover:bg-[var(--secondary)] hover:text-white cursor-pointer"
          onClick={() => {
            router.push("/mobile/average");
          }}
        >
          <p className="text-2xl font-bold text-center w-fit ">
            Evaluación media
          </p>
        </li>
        {modules.length > 0 &&
          modules.map((oneModule, index) => {
            return (
              <li
                className="text-black h-fit py-4 px-2 w-full flex flex-row items-center justify-between hover:bg-[var(--secondary)] hover:text-white cursor-pointer"
                key={oneModule.name}
                onClick={() => {
                  router.push(
                    `/mobile/modulo/${index}?moduleName=${modules[index].name}`
                  );
                }}
              >
                <div className="w-12"></div>
                <p className="text-xl text-center w-fit">{oneModule.name}</p>
                <div className="w-12 flex flex-row items-end justify-center pl-2">
                  {oneModule.selfEvaluation && (
                    <img
                      className="p-0.5 w-5"
                      src="/check.png"
                      alt="Imagen que verifica con un tick que la autoevaluación ha sido realizada"
                    ></img>
                  )}
                  {oneModule.teacherEvaluation && (
                    <img
                      src="/check.png"
                      className="p-0.5 w-5"
                      alt="Imagen que verifica con un tick que la evaluación del profesor ha sido realizada"
                    ></img>
                  )}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
