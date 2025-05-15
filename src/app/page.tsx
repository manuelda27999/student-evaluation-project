"use client";
import { useEffect, useState } from "react";
import useAuthRedirect from "@/lib/useAuthRedirect";

import MobileMenu from "../components/MobileMenu";
import DesktopMenu from "@/components/desktop_modules/DesktopMenu";
import AverageEvaluationDesktop from "@/components/desktop_modules/AverageEvaluationDesktop";
import CalificationsModuleDesktop from "@/components/desktop_modules/CalificationsModuleDesktop";
import SelfEvaluationModuleDesktop from "@/components/desktop_modules/SelfEvaluationModuleDesktop";

export default function Home() {
  useAuthRedirect();

  const [view, setView] = useState("average");
  const [moduleId, setModuleId] = useState<number | null>(null);
  const [moduleName, setModuleName] = useState<string>("");
  const [selfEvaluationDone, setSelfEvaluationDone] = useState<boolean>(false);

  useEffect(() => {
    sessionStorage.setItem("courseId", "uytEidnU3GVsyhNcpbmc");
  }, []);

  const handleChangeToModule = (
    moduleId: number,
    moduleName: string,
    selfEvaluationDone: boolean
  ) => {
    setView("module");
    setModuleId(moduleId);
    setModuleName(moduleName);
    setSelfEvaluationDone(selfEvaluationDone);
  };

  const handleChangeToAverage = () => {
    setView("average");
    setModuleId(null);
    setModuleName("");
    setSelfEvaluationDone(false);
  };

  return (
    <main className="h-full w-screen pt-16">
      <section className="h-full w-full flex flex-row items-start justify-center">
        <div className="block md:hidden w-full ">
          <MobileMenu />
        </div>
        <div className="hidden md:flex h-full w-full flex-row items-start justify-center">
          <div className=" h-full w-1/4 min-w-100">
            <DesktopMenu
              changeModule={handleChangeToModule}
              changeToAverage={handleChangeToAverage}
            />
          </div>
          <div className="h-full w-full">
            {view === "average" && moduleId === null && (
              <AverageEvaluationDesktop />
            )}
            {view === "module" && moduleId !== null && selfEvaluationDone && (
              <CalificationsModuleDesktop
                moduleId={moduleId}
                moduleName={moduleName}
              />
            )}
            {view === "module" && moduleId !== null && !selfEvaluationDone && (
              <SelfEvaluationModuleDesktop
                moduleId={moduleId}
                moduleName={moduleName}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
