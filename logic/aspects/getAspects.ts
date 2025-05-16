import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/credentials";

type Aspect = { name: string };

const getAspects = async (courseId: string) => {
  if (typeof courseId !== "string" || courseId.length < 6)
    throw new Error(
      "The course ID must be a non-empty string of at least 6 characters."
    );

  try {
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      throw new Error("Course does not exist");
    }

    const courseData = courseSnap.data();

    if (!Array.isArray(courseData.aspects) || courseData.aspects.length === 0) {
      throw new Error("No aspects found for this course.");
    }

    const aspects: string[] = courseData.aspects.map(
      (aspect: Aspect) => aspect.name
    );

    return aspects;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("An unknown error occurred.");
  }
};

export default getAspects;
