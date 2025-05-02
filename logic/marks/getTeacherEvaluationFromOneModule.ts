import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/credentials";

type Mark = {
  aspect: string;
  course: string;
  from: string;
  module: string;
  value: number;
};

const getTeacherEvaluationFromOneModule = async (
  userId: string,
  courseId: string,
  moduleId: string
) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User does not exist");
    }

    const userData = userSnap.data();

    const marks = userData.marks || [];

    const filteredMarks = marks.filter((mark: Mark) => {
      const markModuleId = mark.module.split("/").pop();
      const markCourseId = mark.course.split("/").pop();
      const markUserId = mark.from.split("/").pop();

      if (
        markModuleId === moduleId &&
        markCourseId === courseId &&
        markUserId !== userId
      )
        return true;
    });

    const filteredMarksWithValues = filteredMarks.map((mark: Mark) => {
      const markAspectId = mark.aspect.split("/").pop();

      return { aspectId: markAspectId, value: mark.value };
    });

    console.log("Filtered Marks:", filteredMarksWithValues);
    return filteredMarksWithValues;
  } catch (error) {
    console.error("Error getting marks:", error);
  }
};

export default getTeacherEvaluationFromOneModule;
