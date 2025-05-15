import { db } from "../../firebase/credentials";
import { getDoc, doc, DocumentReference } from "firebase/firestore";

const getCoursesFromStudent = async (userId: string) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) throw new Error("User does not exists");

    const userData = userSnap.data();
    const courses = userData.courses;

    const cleanCourses = await Promise.all(
      courses.map(async (courseRef: DocumentReference) => {
        const courseSnap = await getDoc(courseRef);

        if (!courseSnap.exists()) return null;

        const courseData = courseSnap.data();

        return {
          id: courseRef.id,
          name: courseData.name,
        };
      })
    );

    return cleanCourses;
  } catch (error) {
    throw error;
  }
};

export default getCoursesFromStudent;
