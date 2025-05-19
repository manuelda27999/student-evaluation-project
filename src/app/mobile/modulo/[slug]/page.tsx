"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getSelfEvaluationFromOneModule from "../../../../../logic/marks/getSelfEvaluationFromOneModule";
import getTeacherEvaluationFromOneModule from "../../../../../logic/marks/getTeacherEvaluationFromOneModule";
import CalificationsModule from "@/components/mobile_modules/CalificationsModule";
import SelfEvaluationModule from "@/components/mobile_modules/SelfEvaluationModule";
import getAspects from "../../../../../logic/aspects/getAspects";
import Image from "next/image";

export default function ModuloPage() {
  const params = useParams();
  const moduleId = params?.slug as string;
  const searchParams = useSearchParams();
  const moduleName = searchParams.get("moduleName") as string;
  const router = useRouter();

  const [selfEvaluation, setSelfEvaluation] = useState<number[]>([]);
  const [teacherEvaluation, setTeacherEvaluation] = useState<number[]>([]);
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
    <main className="w-full pt-16">
      <div className="flex flex-row justify-between items-center bg-[var(--primary)] fixed top-16 w-full">
        <h2 className="px-2 text-xl my-2 font-bold ">
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
      {selfEvaluation.length === 0 ? (
        <SelfEvaluationModule aspects={aspects} moduleId={Number(moduleId)} />
      ) : (
        <CalificationsModule
          teacherEvaluation={teacherEvaluation}
          selfEvaluation={selfEvaluation}
          aspects={aspects}
          moduleId={Number(moduleId)}
        />
      )}
    </main>
  );
}
