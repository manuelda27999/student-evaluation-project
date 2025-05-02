import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/credentials";

const createCourse = async (name: string) => {
  try {
    const docRef = await addDoc(collection(db, "courses"), {
      name: name,
      modules: [],
      aspects: [],
    });

    console.log("Course created successfully: ", docRef.id);

    return true;
  } catch (error) {
    throw error;
  }
};

export default createCourse;
