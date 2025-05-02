import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/credentials";

const createMark = async (
  userId: string,
  aspectId: number,
  courseId: string,
  issuerUserId: string,
  moduleId: number,
  value: number
) => {
  const mark = {
    aspect: `courses/${courseId}/aspects/${aspectId}`,
    course: `courses/${courseId}`,
    from: `users/${issuerUserId}`,
    module: `courses/${courseId}/modules/${moduleId}`,
    value: value,
  };

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User does not exist");
    }

    await updateDoc(userRef, {
      marks: arrayUnion(mark),
    });
  } catch (error) {
    console.error("Error creating mark:", error);
    throw error;
  }
};

export default createMark;
