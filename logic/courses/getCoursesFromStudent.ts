import { db } from "../../firebase/credentials";
import { getDoc, doc, DocumentReference } from "firebase/firestore";
import { Course } from "../interfaces";

/**
 * Fetches courses for a given student by user ID.
 * @param userId Firestore user document ID.
 * @throws {Error} If the user does not exist or Firestore operations fail.
 * @returns {Promise<Course[]>} List of enrolled courses.
 */

const getCoursesFromStudent = async (userId: string): Promise<Course[]> => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) throw new Error("User does not exists");

    const userData = userSnap.data();
    const { courses: courseRefs } = userData as {
      courses: DocumentReference[];
    };

    const courseResults = await Promise.all(
      courseRefs.map(async (courseRef) => {
        const courseSnap = await getDoc(courseRef);
        if (!courseSnap.exists()) {
          console.warn(`Course with id ${courseRef.id} not found`);
          return null;
        }
        const data = courseSnap.data() as { name: string };

        return {
          id: courseRef.id,
          name: data.name,
        };
      })
    );

    const enrolledCourses = courseResults.filter(
      (c): c is Course => c !== null
    );

    return enrolledCourses;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("An unknown error occurred while fetching the courses.");
  }
};

export default getCoursesFromStudent;
