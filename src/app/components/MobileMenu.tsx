"use client";

import React, { useEffect, useState } from "react";
import getModules from "../../../logic/modules/getModules";
import { useRouter } from "next/navigation";
import getNameOfCourse from "../../../logic/courses/getNameOfCourse";

interface Module {
  name: string;
  selfEvaluation: boolean;
  teacherEvaluation: boolean;
}

export default function MobileMenu() {
  const router = useRouter();

  const [courseName, setCourseName] = useState<string | null>(null);
  const [modules, setModules] = useState<Module[]>([]);

  console.log(modules);

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
  }, []);

  return (
    <div className="w-screen h-full flex flex-col items-center justify-start bg-white">
      <div className="bg-[var(--primary)] w-full h-16 flex flex-row items-center justify-center fixed top-16">
        <h1 className=" text-2xl text-white font-bold">{courseName}</h1>
      </div>

      <ul className="w-screen flex flex-col items-center justify-start mt-16">
        {modules.length > 0 &&
          modules.map((oneModule, index) => {
            return (
              <li
                className="text-black h-fit py-4 px-2 w-screen flex flex-row items-center justify-between hover:bg-[var(--primary)] hover:text-white "
                key={oneModule.name}
                onClick={() => {
                  router.push(
                    `/modulo/${index}?moduleName=${modules[index].name}`
                  );
                }}
              >
                <div className="w-12"></div>
                <p className="text-xl text-center w-fit">{oneModule.name}</p>
                <div className="w-12 flex flex-row items-start justify-center pr-2">
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
