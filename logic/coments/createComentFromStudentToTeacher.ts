import { DocumentReference } from "firebase-admin/firestore";
import { db } from "../../firebase/credentials";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const createComentFromStudentToTeachers = async (
  text: string,
  courseId: string,
  moduleId: number,
  issuerUserId: string
) => {
  try {
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      throw new Error("Course does not exist");
    }

    const teachers = courseSnap.data()?.teachers || [];

    await Promise.all(
      teachers.map(async (teacherRef: DocumentReference) => {
        const userRef = doc(db, "users", teacherRef.id);
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
  } catch (error) {
    console.error("Error creating coment:", error);
    throw error;
  }
};

export default createComentFromStudentToTeachers;
