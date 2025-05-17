import createComentFromStudentToTeachers from "./createComentFromStudentToTeacher";

const text =
  "En este módulo del bootcamp me he sentido muy perdido, por varias razones, etc, etc, etc";
const courseId = "uytEidnU3GVsyhNcpbmc";
const moduleId = 4;
const issuerUserId = "W3RxwOPnJXZ2SyEDhhhTQVb5chA3";

const handleCreateComentFromStudentToTeachers = async () => {
  try {
    const response = await createComentFromStudentToTeachers(
      text,
      courseId,
      moduleId,
      issuerUserId
    );
    console.log("Coment created successfully", response);
  } catch (error) {
    console.error("Error creating coment:", error);
  }
};

handleCreateComentFromStudentToTeachers();
