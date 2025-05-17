import { db } from "../../firebase/credentials";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const createModule = async (courseId: string, moduleName: string) => {
  if (typeof courseId !== "string" || courseId.trim().length < 6)
    throw new Error("Invalid course ID.");

  if (typeof moduleName !== "string" || moduleName.length < 3)
    throw new Error("Comment must be at least 3 characters long.");

  try {
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      throw new Error("Course does not exist");
    }

    const courseData = courseSnap.data();

    const existingModules = Array.isArray(courseData.modules)
      ? courseData.modules
      : [];

    if (existingModules.some((mod) => mod.name === moduleName)) {
      throw new Error("A module with this name already exists.");
    }

    const updatedModules = [...existingModules, { name: moduleName }];

    await updateDoc(courseRef, { modules: updatedModules });

    console.log("Module created successfully");

    return { name: moduleName, message: "Module created successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("An unknown error occurred while creating the module.");
  }
};

export default createModule;
