"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getSelfEvaluationFromOneModule from "../../../../logic/marks/getSelfEvaluationFromOneModule";
import getTeacherEvaluationFromOneModule from "../../../../logic/marks/getTeacherEvaluationFromOneModule";
import CalificationsModule from "@/app/components/modules/CalificationsModule";
import SelfEvaluationModule from "@/app/components/modules/SelfEvaluationModule";

export default function ModuloPage() {
  const params = useParams();
  const moduleId = params?.slug as string;
  const searchParams = useSearchParams();
  const moduleName = searchParams.get("moduleName") as string;
  const router = useRouter();

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
      handleGetSelfEvaluation(userId, "uytEidnU3GVsyhNcpbmc", moduleId);
      handleGetTeacherEvaluation(userId, "uytEidnU3GVsyhNcpbmc", moduleId);
    }
  }, [moduleId]);

  return (
    <main className="pt-16">
      <div className="flex flex-row bg-[var(--primary)] fixed top-16">
        <h2 className="px-2 text-xl my-2 font-bold ">
          {"Módulo " + moduleId + ": " + moduleName}
        </h2>
        <button onClick={() => router.back()} className="p-2">
          <img
            src="/volver.png"
            alt="Botón de volver"
            className="w-16 cursor-pointer"
          />
        </button>
      </div>
      {selfEvaluation.length === 0 ? (
        <SelfEvaluationModule aspects={aspects} moduleId={Number(moduleId)} />
      ) : (
        <CalificationsModule
          teacherEvaluation={teacherEvaluation}
          selfEvaluation={selfEvaluation}
          aspects={aspects}
        />
      )}
    </main>
  );
}
