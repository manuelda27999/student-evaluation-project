import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/credentials";
import { Course } from "../interfaces";

/**
 * Fetches all the courses from Firestore
 * @throws {Error} When firestore query fails
 * @returns {Promise<Course[]>} List of courses.
 */

const getAllCourses = async (): Promise<Course[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "courses"));

    const courses = querySnapshot.docs.map((doc) => {
      const data = doc.data() as { name: string };

      return {
        id: doc.id,
        name: data.name,
      };
    });

    return courses;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error(
      "An unknown error occurred while retrieving all the courses."
    );
  }
};

export default getAllCourses;
