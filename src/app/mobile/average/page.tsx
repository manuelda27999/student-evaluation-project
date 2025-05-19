"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, useMemo } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import getAverageSelfEvaluation from "../../../../logic/marks/getAverageSelfEvaluation";
import getAverageTeacherEvaluation from "../../../../logic/marks/getAverageTeacherEvaluation";
import getModules from "../../../../logic/course-modules/getModules";
import Image from "next/image";

interface Module {
  name: string;
  selfEvaluation: boolean;
  teacherEvaluation: boolean;
}

export default function AverageCalification() {
  Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
  );
  const router = useRouter();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [selfAverage, setSelfAverage] = useState<number[]>([]);
  const [teacherAverage, setTeacherAverage] = useState<number[]>([]);
  const [modules, setModules] = useState<string[]>([]);
  const evaluationsNames = useMemo(
    () => ["Nada", "Bajo", "Medio", "Alto", "Destaca"],
    []
  );
  /* console.log(selfAverage);
  console.log(teacherAverage);
  console.log(modules); */

  const handleGetAverageSelfEvaluation = async (
    userId: string,
    courseId: string
  ) => {
    try {
      const selfAverage = await getAverageSelfEvaluation(userId, courseId);
      setSelfAverage(selfAverage);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetAverageTeacherEvaluation = async (
    userId: string,
    courseId: string
  ) => {
    try {
      if (userId !== null && courseId !== null) {
        const teacherAverage = await getAverageTeacherEvaluation(
          userId,
          courseId
        );
        setTeacherAverage(teacherAverage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetModules = async (course: string) => {
    try {
      const userId = sessionStorage.getItem("userId");

      if (typeof userId === "string") {
        const modules = await getModules(userId, course);

        const formatModules: string[] = [];

        modules.forEach((module: Module, index: number) => {
          if (selfAverage[index] || teacherAverage[index]) {
            formatModules.push(module.name);
          }
        });

        setModules(formatModules);
      }
    } catch (error) {
      console.error("Error getting modules:", error);
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const courseId = sessionStorage.getItem("courseId");

    if (userId !== null && courseId !== null) {
      handleGetAverageSelfEvaluation(userId, courseId);
      handleGetAverageTeacherEvaluation(userId, courseId);
      handleGetModules(courseId);
    }
  }, [selfAverage.length, teacherAverage.length]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (canvasRef.current != null) {
      const context = canvasRef.current;

      const chartInstance = new Chart(context, {
        type: "bar",
        data: {
          labels: modules.map((module, index) => `M${index}`),
          datasets: [
            {
              label: "Autoevaluación media por módulo",
              data: selfAverage,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
            },
            {
              label: "Evaluación del profesor media por módulo",
              data: teacherAverage,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
            tooltip: {
              callbacks: {
                title: (tooltipItem) => {
                  return modules[tooltipItem[0].dataIndex];
                },
                label: (tooltipItem) => {
                  const value = tooltipItem.parsed.y;

                  const label = evaluationsNames[Math.round(value)];

                  return `${tooltipItem.dataset.label}: ${label}`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 4,
              ticks: {
                stepSize: 1,
                callback: (value: number | string) => {
                  if (value == 0) return "Nada";
                  if (value == 1) return "";
                  if (value == 2) return "";
                  if (value == 3) return "";
                  if (value == 4) return "Destaca";
                  return "";
                },
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
  }, [modules.length]);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center pt-18 px-2">
      <div className="flex flex-row justify-between items-center bg-[var(--primary)] fixed top-16 w-full">
        <h2 className="px-2 text-xl my-2 font-bold ">
          Evaluación media del curso
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
      <canvas
        ref={canvasRef}
        className="md:max-w-1/2 md:max-h-6/12 w-full h-64"
      />
      <div className="flex flex-col p-2  mt-4">
        <p className="text-red-800 mb-4">
          {"Autoevaluación de todo el curso: " +
            evaluationsNames[
              Math.round(
                selfAverage.reduce((accumulator, currentValue) => {
                  return accumulator + currentValue;
                }, 0) / selfAverage.length
              )
            ]}
        </p>
        <p className="text-blue-800">
          {"Evaluación del profesor de todo el curso: " +
            evaluationsNames[
              Math.round(
                teacherAverage.reduce((accumulator, currentValue) => {
                  return accumulator + currentValue;
                }, 0) / teacherAverage.length
              )
            ]}
        </p>
      </div>
    </div>
  );
}
