import { db } from "../../firebase/credentials";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const createModule = async (courseId: string, moduleName: string) => {
  try {
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      throw new Error("Course does not exist");
    }

    const courseData = courseSnap.data();

    const updatedModules = [...courseData.modules, { name: moduleName }];

    await updateDoc(courseRef, { modules: updatedModules });

    console.log("Module created successfully");

    return true;
  } catch (error) {
    console.error("Error creating module:", error);
    throw error;
  }
};

export default createModule;
