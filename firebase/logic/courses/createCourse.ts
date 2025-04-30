import { setDoc, doc } from "firebase/firestore";
import { db } from "../../credentials";

const createCourse = async (name: string) => {
  try {
    const randomId = Math.random().toString(36).substring(2, 10);

    await setDoc(doc(db, "courses", randomId), {
      name: name,
    });

    console.log("Course created successfully");

    return true;
  } catch (error) {
    throw error;
  }
};

export default createCourse;
