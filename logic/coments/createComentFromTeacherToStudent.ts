import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/credentials";

const createComentFromTeacherToStudent = async (
  userId: string,
  text: string,
  courseId: string,
  moduleId: number,
  issuerUserId: string
) => {
  const coment = {
    course: `courses/${courseId}`,
    from: `users/${issuerUserId}`,
    module: `courses/${courseId}/modules/${moduleId}`,
    text: text,
  };

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User does not exist");
    }

    await updateDoc(userRef, {
      coments: arrayUnion(coment),
    });
  } catch (error) {
    console.error("Error creating coment:", error);
    throw error;
  }
};

export default createComentFromTeacherToStudent;
