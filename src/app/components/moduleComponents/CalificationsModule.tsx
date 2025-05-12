import { useRef, useState, useEffect } from "react";
import Chart from "chart.js/auto";

export default function CalificationsModule(props: {
  teacherEvaluation: number[];
  selfEvaluation: number[];
  aspects: string[];
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /* console.log(props.teacherEvaluation);
  console.log(props.selfEvaluation);
  console.log(props.aspects); */

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
  }, [props.teacherEvaluation, props.selfEvaluation]);

  return (
    <div className="w-full h-full flex flex-col items-start justify-baseline">
      <canvas
        ref={canvasRef}
        className="md:max-w-1/2 md:max-h-6/12 mt-4 w-full h-64"
      ></canvas>
      <div className="w-full flex flex-col items-center justify-start mt-10">
        <h3 className="text-black text-2xl font-bold w-3/4 mb-4 ">
          Comentarios del profesor
        </h3>
        <p className="text-black">
          Tu trabajo está dando sus frutos, sigue en esta línea y conseguirás
          buenos resultados. Podrías mejorar tu capacidad de aprendizaje y ser
          más aútonomo buscando información en interner, te propongo solucionar
          tus problemas con el código buscando en la documentación oficial,
          posts de Stack Overflow o tutoriales de Youtube.{" "}
        </p>
      </div>
    </div>
  );
}
