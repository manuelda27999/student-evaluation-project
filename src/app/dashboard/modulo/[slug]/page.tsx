"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import getSelfEvaluationFromOneModule from "../../../../../logic/marks/getSelfEvaluationFromOneModule";
import getTeacherEvaluationFromOneModule from "../../../../../logic/marks/getTeacherEvaluationFromOneModule";
import getAspects from "../../../../../logic/aspects/getAspects";
import SelfEvaluationModuleDesktop from "@/components/desktop_modules/SelfEvaluationModuleDesktop";
import CalificationsModuleDesktop from "@/components/desktop_modules/CalificationsModuleDesktop";

export default function ModuloPage() {
  const params = useParams();
  const moduleId = params?.slug as string;
  const searchParams = useSearchParams();
  const moduleName = searchParams.get("moduleName") as string;
  const router = useRouter();

  const [selfEvaluation, setSelfEvaluation] = useState<number[] | null>(null);
  const [teacherEvaluation, setTeacherEvaluation] = useState<number[] | null>(
    null
  );
  const [aspects, setAspects] = useState<string[]>([]);

  /* console.log(selfEvaluation);
  console.log(teacherEvaluation);
  console.log(aspects); */
  /* console.log("Aspects", aspects); */

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

  const handleGetAspects = async (courseID: string) => {
    try {
      const aspects = await getAspects(courseID);
      setAspects(aspects);
    } catch (error) {
      console.error("Error getting aspects:", error);
    }
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const courseId = sessionStorage.getItem("courseId");
    if (typeof userId === "string" && typeof courseId === "string") {
      handleGetSelfEvaluation(userId, courseId, moduleId);
      handleGetTeacherEvaluation(userId, courseId, moduleId);
      handleGetAspects(courseId);
    }
  }, [moduleId]);

  return (
    <main className="w-full h-full">
      <div className="flex flex-row justify-between items-center text-[var(--primary)] realtive w-full">
        <h2 className="px-4 text-2xl my-2 font-bold ">
          {"Módulo " + moduleId + ": " + moduleName}
        </h2>
        <button onClick={() => router.back()} className="p-2 pr-4">
          <Image
            width={48}
            height={48}
            src="/volver.png"
            alt="Botón de volver"
            className="max-w-12 w-12 cursor-pointer"
          />
        </button>
      </div>
      {selfEvaluation !== null && selfEvaluation.length === 0 && (
        <SelfEvaluationModuleDesktop
          aspects={aspects}
          moduleId={Number(moduleId)}
        />
      )}{" "}
      {selfEvaluation !== null &&
        teacherEvaluation !== null &&
        selfEvaluation.length > 0 && (
          <CalificationsModuleDesktop
            teacherEvaluation={teacherEvaluation}
            selfEvaluation={selfEvaluation}
            aspects={aspects}
            moduleId={Number(moduleId)}
          />
        )}
    </main>
  );
}
