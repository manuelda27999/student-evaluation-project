import { db } from "../../firebase/credentials";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const createAspect = async (courseId: string, aspectName: string) => {
  if (typeof courseId !== "string" || typeof aspectName !== "string")
    throw new Error(
      "The id of the course and the name of the aspect must be strings."
    );

  if (!courseId || courseId.length < 6) throw new Error("Invalid course ID.");

  if (!aspectName || aspectName.trim().length < 3)
    throw new Error("The aspect's name must be at least 3 characters long.");

  try {
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      throw new Error("Course does not exist");
    }

    const courseData = courseSnap.data();
    const cleanName = aspectName.trim();

    const existingAspects = Array.isArray(courseData.aspects)
      ? courseData.aspects
      : [];

    if (existingAspects.some((a) => a.name === cleanName)) {
      throw new Error("Aspect already exists");
    }

    const updateAspects = [...existingAspects, { name: cleanName }];

    try {
      await updateDoc(courseRef, { aspects: updateAspects });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error("An unknown error occurred.");
    }

    return updateAspects;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("An unknown error occurred.");
  }
};

export default createAspect;
