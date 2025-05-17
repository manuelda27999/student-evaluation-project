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
import getSelfEvaluationFromOneModule from "../logic/marks/getSelfEvaluationFromOneModule";
import { onAuthStateChanged } from "firebase/auth";

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
    let courseName = "";
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) throw new Error("Course does not exists");

    const courseData = courseSnap.data();
    courseName = courseData.name;

    console.log("Course name:", courseName);

    return courseName;
  } catch (error) {
    throw error;
  }
}

main();
