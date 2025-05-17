import getCoursesFromStudent from "./getCoursesFromStudent";

const userId = "W3RxwOPnJXZ2SyEDhhhTQVb5chA3";

const handleGetCoursesFromStudent = async () => {
  try {
    const response = await getCoursesFromStudent(userId);
    console.log("Get courses from students done successfully", response);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

handleGetCoursesFromStudent();
