import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/credentials";
import getSelfEvaluationFromOneModule from "../marks/getSelfEvaluationFromOneModule";
import getTeacherEvaluationFromOneModule from "../marks/getTeacherEvaluationFromOneModule";
import { Module } from "../interfaces";

/**
 * Retrieves all modules for a given user and course,
 * and annotates each with whether self- and teacher-evaluations exist.
 *
 * @param userId the Firebase user ID
 * @param courseId the Firebase course ID
 * @throws {Error} on invalid IDs or Firestore failures
 * @returns Promise<Module[]> the annotated module list
 */

const getModules = async (
  userId: string,
  courseId: string
): Promise<Module[]> => {
  if (!userId || typeof userId !== "string")
    throw new Error("Invalid user ID.");

  if (!courseId || typeof courseId !== "string")
    throw new Error("Invalid course ID.");

  try {
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) throw new Error("Course does not exist");

    const courseData = courseSnap.data();

    const modules = courseData.modules as Module[];

    await Promise.all(
      modules.map(async (module: Module, index: number) => {
        try {
          const [selfEvaluation, teacherEvaluation] = await Promise.all([
            getSelfEvaluationFromOneModule(userId, courseId, index.toString()),
            getTeacherEvaluationFromOneModule(
              userId,
              courseId,
              index.toString()
            ),
          ]);

          module.selfEvaluation = selfEvaluation.length > 0;
          module.teacherEvaluation = teacherEvaluation.length > 0;
        } catch (error) {
          console.error(`Error processing module ${index}:`, error);
        }
      })
    );

    return modules;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("An unknown error occurred while retrieving the modules.");
  }
};

export default getModules;
