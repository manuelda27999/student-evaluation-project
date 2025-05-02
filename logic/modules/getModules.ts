import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/credentials";

const getModules = async (courseId: string) => {
  try {
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) throw new Error("Course does not exists");

    const courseData = courseSnap.data();

    console.log(courseData.modules);
  } catch (error) {
    console.error("Error getting modules:", error);
  }
};

export default getModules;
