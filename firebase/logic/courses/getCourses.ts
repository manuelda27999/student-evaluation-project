import { getDocs, collection } from "firebase/firestore";
import { db } from "../../credentials";

const getCourses = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "courses"));

    const courses = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        name: doc.data().name,
      };
    });

    return courses;
  } catch (error) {
    throw error;
  }
};

export default getCourses;
