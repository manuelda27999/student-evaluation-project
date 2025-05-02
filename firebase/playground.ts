import { db, auth } from "./credentials";
import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

type Mark = {
  aspect: string;
  course: string;
  from: string;
  module: string;
  value: number;
};

async function main() {
  const name = "ManueDa";
  const email = "manuel@david.com";
  const courseId = "uytEidnU3GVsyhNcpbmc";
  const moduleId = "0";
  const password = "123123123";
  const role = "teacher";
  const userId = "W3RxwOPnJXZ2SyEDhhhTQVb5chA3";

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User does not exist");
    }

    const userData = userSnap.data();

    const marks = userData.marks || [];

    const filteredMarks = marks.filter((mark: Mark) => {
      const markModuleId = mark.module.split("/").pop();
      const markCourseId = mark.course.split("/").pop();
      const markUserId = mark.from.split("/").pop();

      if (
        markModuleId === moduleId &&
        markCourseId === courseId &&
        markUserId === userId
      )
        return true;
    });

    const filteredMarksWithValues = filteredMarks.map((mark: Mark) => {
      const markAspectId = mark.aspect.split("/").pop();

      return { aspectId: markAspectId, value: mark.value };
    });

    console.log("Filtered Marks:", filteredMarksWithValues);
    return filteredMarksWithValues;
  } catch (error) {
    console.error("Error getting marks:", error);
  }
}

main();
