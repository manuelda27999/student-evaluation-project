import createComentFromStudentToTeachers from "./createComentFromStudentToTeacher";

const text = "Esta semana no he podido avanzar en el módulo 0";
const courseId = "uytEidnU3GVsyhNcpbmc";
const moduleId = 0;
const issuerUserId = "W3RxwOPnJXZ2SyEDhhhTQVb5chA3";

const handleCreateComentFromStudentToTeachers = async () => {
  try {
    await createComentFromStudentToTeachers(
      text,
      courseId,
      moduleId,
      issuerUserId
    );
    console.log("Coment created successfully");
  } catch (error) {
    console.error("Error creating coment:", error);
  }
};
handleCreateComentFromStudentToTeachers();
