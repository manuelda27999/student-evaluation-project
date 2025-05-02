import { useRef, useState, useEffect } from "react";
import Chart from "chart.js/auto";

export default function CalificationsModule() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [teacherEvaluation, setTeacherEvaluation] = useState([9, 9, 4, 5, 7]);
  const [selfEvaluation, setSelfEvaluation] = useState([10, 10, 6, 5, 9]);

  useEffect(() => {
    if (canvasRef.current != null) {
      const context = canvasRef.current;

      const chartInstance = new Chart(context, {
        type: "bar",
        data: {
          labels: [
            "Actitud",
            ["Trabajo en", "equipo"],
            "Independencia",
            ["Nivel", "técnico"],
            ["Posicionamiento", "general"],
          ],
          datasets: [
            {
              label: "Autoevaluación",
              data: selfEvaluation,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 99, 132, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 1,
            },
            {
              label: "Evaluación del profesor",
              data: teacherEvaluation,
              backgroundColor: [
                "rgba(54, 162, 235, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(54, 162, 235, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 10,
              ticks: {
                stepSize: 1,
                callback: function (value: number | string) {
                  const labels = [
                    "Nada",
                    "Pobre",
                    "Insuficiente",
                    "Regular",
                    "Aceptable",
                    "Bien",
                    "Muy bien",
                    "Notable",
                    "Excelente",
                    "Sobresaliente",
                  ];
                  return typeof value === "number" ? labels[value - 1] : value;
                },
              },
            },
          },
          plugins: {
            legend: {
              display: true,
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  const labels = [
                    "Nada",
                    "Pobre",
                    "Insuficiente",
                    "Regular",
                    "Aceptable",
                    "Bien",
                    "Muy bien",
                    "Notable",
                    "Excelente",
                    "Sobresaliente",
                  ];

                  const value = tooltipItem.raw;
                  if (typeof value === "number") {
                    if (tooltipItem.datasetIndex === 0) {
                      return "Autoevaluación: " + labels[value - 1];
                    } else {
                      return "Evaluación del profesor: " + labels[value - 1];
                    }
                  }
                },
              },
            },
          },
        },
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-row items-start justify-baseline">
      <canvas
        ref={canvasRef}
        className="max-w-1/2 max-h-6/12 m-4 mt-10"
      ></canvas>
      <div className="w-full flex flex-col items-center justify-start mt-10">
        <h3 className="text-black text-2xl font-bold w-3/4 mb-4 ">
          Comentarios del profesor
        </h3>
        <p className="text-black w-3/4">
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
