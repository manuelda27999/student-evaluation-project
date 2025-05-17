import createCourse from "./createCourse";

const courseName = "Civerseguridad 2";
const teachers = ["ws2eKMxmbGUmZGztQvpeKN2qFF12"];

const handleCreateCourse = async () => {
  try {
    const response = await createCourse(courseName, teachers);
    console.log("Course created successfully", response);
  } catch (error) {
    console.error("Error creating coment:", error);
  }
};

handleCreateCourse();
