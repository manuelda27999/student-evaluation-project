import { db } from "../../firebase/credentials";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const createAspect = async (courseId: string, aspectName: string) => {
  try {
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      throw new Error("Course does not exist");
    }

    const courseData = courseSnap.data();

    const updateAspects = [...courseData.aspects, { name: aspectName }];

    await updateDoc(courseRef, { aspects: updateAspects });

    console.log("Aspect created successfully");

    return true;
  } catch (error) {
    console.error("Error creating aspect:", error);
    throw error;
  }
};

export default createAspect;
