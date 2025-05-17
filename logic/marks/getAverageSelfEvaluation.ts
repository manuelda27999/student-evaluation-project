import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/credentials";

type Mark = {
  aspect: string;
  course: string;
  from: string;
  module: string;
  value: number;
};

type FilterMark = {
  module: number;
  value: number;
};

const getAverageSelfEvaluation = async (userId: string, courseId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User does not exist");
    }

    const userData = userSnap.data();

    const marks = userData.marks || [];

    if (marks.lenght === 0) return marks;

    const filterMarks = marks.filter((mark: Mark) => {
      const markCourseId = mark.course.split("/").pop();
      const markUserId = mark.from.split("/").pop();

      if (markCourseId === courseId && markUserId === userId) {
        return true;
      }
    });

    const filteredMarksWithValuesAndModules = filterMarks.map((mark: Mark) => {
      return {
        value: mark.value,
        module: Number(mark.module.split("/").pop()),
      };
    });

    const selfEvaluationAverage: number[] = [];

    filteredMarksWithValuesAndModules.forEach((filterMark: FilterMark) => {
      if (!selfEvaluationAverage[filterMark.module]) {
        selfEvaluationAverage[filterMark.module] = filterMark.value;
      } else {
        selfEvaluationAverage[filterMark.module] += filterMark.value;
      }
    });

    const finalAverage = selfEvaluationAverage.map((sumatory: number) => {
      return sumatory / 5;
    });

    return finalAverage;
  } catch (error) {
    console.error("Error getting the average selfevaluation", error);
  }
};

export default getAverageSelfEvaluation;
