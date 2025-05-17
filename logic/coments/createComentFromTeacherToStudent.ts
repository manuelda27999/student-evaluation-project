import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/credentials";

type Coment = {
  course: string;
  from: string;
  module: string;
  text: string;
};

const createComentFromTeacherToStudent = async (
  userId: string,
  text: string,
  courseId: string,
  moduleId: number,
  issuerUserId: string
) => {
  if (typeof userId !== "string" || userId.trim().length < 6)
    throw new Error("Invalid issuer user ID.");

  if (typeof text !== "string" || text.length < 3)
    throw new Error("Comment must be at least 3 characters long.");

  if (typeof courseId !== "string" || courseId.trim().length < 6)
    throw new Error("Invalid course ID.");

  if (typeof moduleId !== "number" || moduleId < 0)
    throw new Error("Invalid module ID. Must be a positive number.");

  if (typeof issuerUserId !== "string" || issuerUserId.trim().length < 6)
    throw new Error("Invalid issuer user ID.");

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

    const { coments } = userSnap.data() as { coments: Coment[] };

    coments.forEach((coment: Coment) => {
      if (Number(coment.module.split("/").pop()) === moduleId)
        throw new Error("The coment for this module is already created");
    });

    await updateDoc(userRef, {
      coments: arrayUnion(coment),
    });

    return { message: "comment created successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("An unknown error occurred while creating the comment.");
  }
};

export default createComentFromTeacherToStudent;
