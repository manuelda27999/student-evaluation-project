import getAverageSelfEvaluation from "./getAverageSelfEvaluation";

const userId = "W3RxwOPnJXZ2SyEDhhhTQVb5chA3";
const courseId = "uytEidnU3GVsyhNcpbmc";

const handleGetAverageSelfEvaluation = async () => {
  try {
    const selfEvaluationAverage = await getAverageSelfEvaluation(
      userId,
      courseId
    );
    console.log(selfEvaluationAverage);
  } catch (error) {
    console.error("Error getting the selfevaluation average:", error);
  }
};

handleGetAverageSelfEvaluation();
