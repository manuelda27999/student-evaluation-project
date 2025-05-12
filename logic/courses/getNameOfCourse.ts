import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../firebase/credentials";

const getNameOfCourse = async (courseId: string) => {
  try {
    let courseName = "";
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) throw new Error("Course does not exists");

    const courseData = courseSnap.data();
    courseName = courseData.name;

    return courseName;
  } catch (error) {
    throw error;
  }
};

export default getNameOfCourse;
