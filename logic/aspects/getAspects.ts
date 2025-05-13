import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/credentials";

const getAspects = async (courseId: string) => {
  try {
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      throw new Error("Course does not exist");
    }

    const courseData = courseSnap.data();

    if (!courseData.aspects || courseData.aspects.length === 0) {
      throw new Error("Aspects do not exist");
    }

    const aspects = courseData.aspects.map((aspect: any) => aspect.name);

    return aspects;
  } catch (error) {
    console.error("Error getting aspects:", error);
    throw error;
  }
};

export default getAspects;
