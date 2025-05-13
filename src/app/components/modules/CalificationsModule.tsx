import { useRef, useState, useEffect } from "react";
import Chart from "chart.js/auto";
import getTeacherComent from "../../../../logic/coments/getTeacherComent";

export default function CalificationsModule(props: {
  teacherEvaluation: number[];
  selfEvaluation: number[];
  aspects: string[];
  moduleId: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [coment, setComent] = useState<string>(
    "El profesor aún no te ha evaluado"
  );

  /* console.log(props.teacherEvaluation);
  console.log(props.selfEvaluation);
  console.log(props.aspects); */

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

    if (
      typeof userId === "string" &&
      typeof courseId === "string" &&
      props.teacherEvaluation.length > 0
    )
      handleGetComentFromTeacher(userId, courseId, props.moduleId);
  }, []);

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
  }, [props.teacherEvaluation, props.selfEvaluation, props.aspects]);

  return (
    <div className="w-full h-full flex flex-col items-start justify-baseline pt-20">
      <canvas
        ref={canvasRef}
        className="md:max-w-1/2 md:max-h-6/12 w-full h-64"
      ></canvas>
      <div className="w-full flex flex-col items-center justify-start mt-10">
        <h3 className="text-black text-2xl font-bold w-3/4 mb-2 ">
          Comentarios del profesor
        </h3>
        <p className="text-black px-4">
          {coment === "" ? (
            <span className="text-gray-500">No hay comentarios</span>
          ) : (
            coment
          )}
        </p>
      </div>
    </div>
  );
}
