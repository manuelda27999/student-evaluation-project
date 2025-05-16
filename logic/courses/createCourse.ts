import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/credentials";

const createCourse = async (courseName: string, teachers: string[]) => {
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
