import getCoursesFromStudent from "./getCoursesFromStudent";

const userId = "W3RxwOPnJXZ2SyEDhhhTQVb5chA3";

const handleGetCoursesFromStudent = async () => {
  try {
    const courses = await getCoursesFromStudent(userId);
    console.log(courses);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

handleGetCoursesFromStudent();
