import getAllCourses from "./getAllCourses";

const handleGetAllCourses = async () => {
  try {
    const response = getAllCourses();
    console.log("Get all the course successfully:", response);
  } catch (error) {
    console.error("Error getting all the modules:", error);
  }
};

handleGetAllCourses();
