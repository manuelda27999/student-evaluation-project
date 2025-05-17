import { DocumentReference } from "firebase-admin/firestore";
import { db } from "../../firebase/credentials";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

type Coment = {
  course: string;
  from: string;
  module: string;
  text: string;
};

const createComentFromStudentToTeachers = async (
  text: string,
  courseId: string,
  moduleId: number,
  issuerUserId: string
) => {
  if (typeof text !== "string" || text.length < 3)
    throw new Error("Comment must be at least 3 characters long.");

  if (typeof courseId !== "string" || courseId.trim().length < 6)
    throw new Error("Invalid course ID.");

  if (typeof moduleId !== "number" || moduleId < 0)
    throw new Error("Invalid module ID. Must be a positive number.");

  if (typeof issuerUserId !== "string" || issuerUserId.trim().length < 6)
    throw new Error("Invalid issuer user ID.");

  try {
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      throw new Error("Course does not exist");
    }

    const teachers = courseSnap.data()?.teachers;

    if (!Array.isArray(teachers)) {
      throw new Error("Invalid teacher list in course document.");
    }

    await Promise.all(
      teachers.map(async (teacherRef: DocumentReference) => {
        const userRef = doc(db, "users", teacherRef.id);

        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          throw new Error("User not found");
        }

        const { coments } = userSnap.data() as { coments: Coment[] };

        coments.forEach((coment: Coment) => {
          if (Number(coment.module.split("/").pop()) === moduleId)
            throw new Error("The coment for this module is already created");
        });

        await updateDoc(userRef, {
          coments: arrayUnion({
            text,
            from: `users/${issuerUserId}`,
            course: `courses/${courseId}`,
            module: `courses/${courseId}/modules/${moduleId}`,
          }),
        });
      })
    );

    return { message: "comment created successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("An unknown error occurred while creating the comment.");
  }
};

export default createComentFromStudentToTeachers;
