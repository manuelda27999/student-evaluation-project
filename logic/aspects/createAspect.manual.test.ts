import createAspect from "./createAspect";

const courseId = "Ud2aBM0Q1s7SORedmsZS";
const aspectName = "  Trabajo en equipo  ";

const handleCreateAspect = async () => {
  try {
    const response = await createAspect(courseId, aspectName);
    console.log("Aspect created successfully: ", response);
  } catch (error) {
    console.error("Error creating aspect: ", error);
  }
};

handleCreateAspect();
