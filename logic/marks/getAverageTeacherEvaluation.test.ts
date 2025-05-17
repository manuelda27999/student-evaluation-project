import getAverageTeacherEvaluation from "./getAverageTeacherEvaluation";

const userId = "W3RxwOPnJXZ2SyEDhhhTQVb5chA3";
const courseId = "uytEidnU3GVsyhNcpbmc";

const handleGetAverageTeacherEvaluation = async () => {
  try {
    const teacherEvaluationAverage = await getAverageTeacherEvaluation(
      userId,
      courseId
    );
    console.log(teacherEvaluationAverage);
  } catch (error) {
    console.error("Error getting the selfevaluation average:", error);
  }
};

handleGetAverageTeacherEvaluation();
