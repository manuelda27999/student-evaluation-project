import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/credentials";
import getSelfEvaluationFromOneModule from "../marks/getSelfEvaluationFromOneModule";
import getTeacherEvaluationFromOneModule from "../marks/getTeacherEvaluationFromOneModule";

const getModules = async (userId: string, courseId: string) => {
  try {
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) throw new Error("Course does not exists");

    const courseData = courseSnap.data();

    for (let i = 0; i < courseData.modules.length; i++) {
      try {
        /* console.log("Module ID:", i); */
        const selfEvaluation = await getSelfEvaluationFromOneModule(
          userId,
          courseId,
          i.toString()
        );

        const teacherEvaluation = await getTeacherEvaluationFromOneModule(
          userId,
          courseId,
          i.toString()
        );

        if (selfEvaluation.length === 0) {
          courseData.modules[i].selfEvaluation = false;
        } else {
          courseData.modules[i].selfEvaluation = true;
        }

        if (teacherEvaluation.length === 0) {
          courseData.modules[i].teacherEvaluation = false;
        } else {
          courseData.modules[i].teacherEvaluation = true;
        }
      } catch (error) {
        console.error("Error populating modules:", error);
      }
    }

    /* console.log(courseData.modules); */
    return courseData.modules;
  } catch (error) {
    console.error("Error getting modules:", error);
  }
};

export default getModules;
