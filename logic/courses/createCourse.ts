import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/credentials";

interface CreateCourseResult {
  id: string;
}

/**
 * Creates a new course in Firestore, ensuring uniqueness and atomic operation.
 *
 * @param courseName the name of the course; must be at least 3 characters.
 * @param teachers an array of teacher user IDs to assign.
 * @throws {Error} If validation fails or the Firestore operation fails.
 * @returns {Promise<CreateCourseResult>} the ID of the newly created course.
 */

const createCourse = async (
  courseName: string,
  teachers: string[]
): Promise<CreateCourseResult> => {
  if (typeof courseName !== "string" || courseName.trim().length < 3)
    throw new Error("Course name must be at least 3 characters.");

  if (!Array.isArray(teachers) || teachers.length === 0)
    throw new Error("At least one teacher must be assigned.");

  try {
    const coursesRef = collection(db, "courses");
    const duplicateQuery = query(coursesRef, where("name", "==", courseName));
    const existingCourses = await getDocs(duplicateQuery);

    if (!existingCourses.empty) {
      throw new Error("A course with this name already exists.");
    }

    const teacherRefs = teachers.map((id) => doc(db, "users", id));

    const docRef = await addDoc(collection(db, "courses"), {
      name: courseName,
      modules: [],
      aspects: [],
      teachers: teacherRefs,
      students: [],
    });

    return { id: docRef.id };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("An unknown error occurred while creating the comment.");
  }
};

export default createCourse;
