import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/credentials";

type Coment = {
  course: string;
  from: string;
  module: string;
  text: string;
};

const getTeacherComent = async (
  userId: string,
  courseId: string,
  moduleId: number
) => {
  if (typeof userId !== "string" || userId.trim().length < 6)
    throw new Error("Invalid user ID.");

  if (typeof courseId !== "string" || courseId.trim().length < 6)
    throw new Error("Invalid course ID.");

  if (typeof moduleId !== "number" || moduleId < 0)
    throw new Error("Invalid module ID.");

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User does not exist");
    }

    const { coments } = userSnap.data() as { coments: Coment[] };

    const teacherComent = coments.find(
      (coment: any) =>
        coment.course === `courses/${courseId}` &&
        coment.module === `courses/${courseId}/modules/${moduleId}`
    );

    if (!teacherComent) {
      throw new Error("Teacher coment not found");
    }

    return { coment: teacherComent.text };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("An unknown error occurred while creating the comment.");
  }
};

export default getTeacherComent;
