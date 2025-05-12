import getTeacherComent from "./getTeacherComent";

const userId = "W3RxwOPnJXZ2SyEDhhhTQVb5chA3";
const courseId = "uytEidnU3GVsyhNcpbmc";
const moduleId = 1;

const handleGetTeacherComent = async () => {
  try {
    const coment = await getTeacherComent(userId, courseId, moduleId);
    console.log("Coment retrieved successfully:", coment);
  } catch (error) {
    console.error("Error getting teacher coment:", error);
  }
};

handleGetTeacherComent();
