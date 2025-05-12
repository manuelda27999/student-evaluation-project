import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/credentials";

const getTeacherComent = async (
  userId: string,
  courseId: string,
  moduleId: number
) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User does not exist");
    }

    const coments = userSnap.data()?.coments || [];

    const teacherComent = coments.find(
      (coment: any) =>
        coment.course === `courses/${courseId}` &&
        coment.module === `courses/${courseId}/modules/${moduleId}`
    );

    if (!teacherComent) {
      throw new Error("Teacher coment not found");
    }

    return teacherComent.text;
  } catch (error) {
    console.error("Error getting own coment:", error);
    throw error;
  }
};

export default getTeacherComent;
