import createComentFromTeacherToStudent from "./createComentFromTeacherToStudent";

const userId = "W3RxwOPnJXZ2SyEDhhhTQVb5chA3";
const text =
  "Buen trabajo del módulo 4, tu esfuerzo está dando muy buenos resultados";
const courseId = "uytEidnU3GVsyhNcpbmc";
const moduleId = 4;
const issuerUserId = "ws2eKMxmbGUmZGztQvpeKN2qFF12";

const handleCreateComent = async () => {
  try {
    const response = await createComentFromTeacherToStudent(
      userId,
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

handleCreateComent();
