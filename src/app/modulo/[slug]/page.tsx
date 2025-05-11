"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import getSelfEvaluationFromOneModule from "../../../../logic/marks/getSelfEvaluationFromOneModule";
import getTeacherEvaluationFromOneModule from "../../../../logic/marks/getTeacherEvaluationFromOneModule";
import CalificationsModule from "@/app/components/moduleComponents/CalificationsModule";

export default function ModuloPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [selfEvaluation, setSelfEvaluation] = useState<number[]>([]);
  const [teacherEvaluation, setTeacherEvaluation] = useState<number[]>([]);
  const [aspects, setAspects] = useState<string[]>([
    "Actitud",
    "Trabajo en \nequipo",
    "Independencia",
    "Nivel técnico",
    "Posicionamiento \ngeneral",
  ]);

  /* console.log(selfEvaluation);
  console.log(teacherEvaluation);
  console.log(aspects); */

  const handleGetSelfEvaluation = async (
    userId: string,
    courseId: string,
    moduleId: string
  ) => {
    try {
      const selfEvaluation = await getSelfEvaluationFromOneModule(
        userId,
        courseId,
        moduleId
      );
      setSelfEvaluation(selfEvaluation);
    } catch (error) {
      console.error("Error getting self evaluation:", error);
    }
  };

  const handleGetTeacherEvaluation = async (
    userId: string,
    courseId: string,
    moduleId: string
  ) => {
    try {
      const teacherEvaluation = await getTeacherEvaluationFromOneModule(
        userId,
        courseId,
        moduleId
      );
      setTeacherEvaluation(teacherEvaluation);
    } catch (error) {
      console.error("Error getting teacher evaluation:", error);
    }
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (typeof userId === "string") {
      handleGetSelfEvaluation(userId, "uytEidnU3GVsyhNcpbmc", slug);
      handleGetTeacherEvaluation(userId, "uytEidnU3GVsyhNcpbmc", slug);
    }
  }, [slug]);

  return (
    <main className="">
      <h1 className="text-2xl font-bold">Página del módulo</h1>
      <p className="mt-4 text-lg text-gray-600">
        Estás viendo el módulo: <strong>{slug}</strong>
      </p>
      <CalificationsModule
        teacherEvaluation={teacherEvaluation}
        selfEvaluation={selfEvaluation}
        aspects={aspects}
      />
    </main>
  );
}
