"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthRedirect from "@/lib/useAuthRedirect";
import getCoursesFromStudent from "../../logic/courses/getCoursesFromStudent";

interface Course {
  id: string;
  name: string;
}

export default function Home() {
  useAuthRedirect();

  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    if (userId) {
      handleGetCourses(userId);
    }
  }, []);

  const handleGetCourses = async (userId: string) => {
    try {
      const result = await getCoursesFromStudent(userId);
      setCourses(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigateToTheCourse = (courseId: string) => {
    try {
      const width = window.innerWidth;
      sessionStorage.setItem("courseId", courseId);

      if (width < 768) {
        router.push("/mobile/menu");
      } else {
        router.push("/dashboard/average");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[var(--primary)] px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Selecciona un curso
      </h1>
      {courses.length === 0 ? (
        <p className="">No se han encontrado cursos disponibles.</p>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-md">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => handleNavigateToTheCourse(course.id)}
              className="w-full bg-[var(--secondary)] font-bold text-xl text-white py-3 rounded cursor-pointer"
            >
              {course.name}
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
