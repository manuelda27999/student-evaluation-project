import { useRef, useState, useEffect } from "react";
import Chart from "chart.js/auto";
import getTeacherComent from "../../../logic/coments/getTeacherComent";
import getSelfEvaluationFromOneModule from "../../../logic/marks/getSelfEvaluationFromOneModule";
import getTeacherEvaluationFromOneModule from "../../../logic/marks/getTeacherEvaluationFromOneModule";
import getAspects from "../../../logic/aspects/getAspects";

export default function CalificationsModuleDesktop(props: {
  teacherEvaluation: number[];
  selfEvaluation: number[];
  aspects: string[];
  moduleId: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [coment, setComent] = useState<string>(
    "El profesor aún no te ha evaluado"
  );
  const evaluationsNames = ["Nada", "Bajo", "Medio", "Alto", "Destaca"];

  /* console.log(props.teacherEvaluation);
  console.log(props.selfEvaluation); */
  /* console.log("ModuleId", props.moduleId);
  console.log("ModuleName", props.moduleName); */

  const handleGetComentFromTeacher = async (
    userId: string,
    courseId: string,
    moduleId: number
  ) => {
    try {
      const teacherComent = await getTeacherComent(userId, courseId, moduleId);
      setComent(teacherComent);
    } catch (error) {
      console.error("Error getting teacher coment:", error);
    }
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const courseId = sessionStorage.getItem("courseId");

    if (typeof userId === "string" && typeof courseId === "string") {
      handleGetComentFromTeacher(userId, courseId, props.moduleId);
    }
  }, [props.moduleId]);

  useEffect(() => {
    if (canvasRef.current != null) {
      const context = canvasRef.current;

      const chartInstance = new Chart(context, {
        type: "radar",
        data: {
          labels: props.aspects,
          datasets: [
            {
              label: "Autoevaluación",
              data: props.selfEvaluation,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
            },
            {
              label: "Evaluación del profesor",
              data: props.teacherEvaluation,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const value = tooltipItem.parsed.r;

                  const label = evaluationsNames[Math.round(value)];

                  return `${tooltipItem.dataset.label}: ${label}`;
                },
              },
            },
          },
          scales: {
            r: {
              min: 0,
              max: 4,
              ticks: {
                stepSize: 1,
                display: false,
              },
              pointLabels: {
                callback: (label: string) => label.split("\n"),
              },
            },
          },
        },
      });

      chartInstance.update();

      return () => {
        chartInstance.destroy();
      };
    }
  }, [
    props.teacherEvaluation,
    props.selfEvaluation,
    props.aspects,
    props.moduleId,
  ]);

  return (
    <div className="w-full h-11/12 flex flex-col items-start justify-baseline">
      <div className="flex flex-row w-full h-full items-start py-6 px-10">
        <canvas
          ref={canvasRef}
          className="md:max-w-1/2 md:max-h-6/12 w-full h-40"
        ></canvas>
        <div className="w-full flex flex-col items-center justify-start pl-4">
          <h3 className="text-black text-2xl font-bold mb-2 ">
            Comentarios del profesor
          </h3>
          <p className="text-black text-lg">
            {coment === "" ? (
              <span className="text-gray-500">No hay comentarios</span>
            ) : (
              coment
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
