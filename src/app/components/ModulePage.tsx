import { useRef, useEffect, useState, use } from "react";

import CalificationsModule from "./moduleComponents/CalificationsModule";
import SelfEvaluationModule from "./moduleComponents/SelfEvaluationModule";

export default function ModulePage(props: { module: string }) {
  const [selfEvaluationFinished, setSelfEvaluationFinished] = useState(false);
  const [teacherEvaluationFinished, setTeacherEvaluationFinished] =
    useState(false);

  useEffect(() => {
    if (!teacherEvaluationFinished) {
      alert("No hay datos de evaluación del profesor");
    }

    if (!selfEvaluationFinished) {
      alert("No hay datos de autoevaluación");
    }
  }, []);

  return (
    <div className="w-4/5 h-full flex flex-col items-start justify-start bg-white pt-20">
      <h2 className="text-black mt-4 ml-4 text-3xl font-bold">
        {props.module}
      </h2>
      {selfEvaluationFinished && <CalificationsModule />}
      {!selfEvaluationFinished && <SelfEvaluationModule />}
    </div>
  );
}
