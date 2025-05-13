import createComentFromTeacherToStudent from "./createComentFromTeacherToStudent";

const userId = "W3RxwOPnJXZ2SyEDhhhTQVb5chA3";
const text = "Buen trabajo del módulo 3";
const courseId = "uytEidnU3GVsyhNcpbmc";
const moduleId = 3;
const issuerUserId = "ws2eKMxmbGUmZGztQvpeKN2qFF12";

const handleCreateComent = async () => {
  try {
    await createComentFromTeacherToStudent(
      userId,
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

handleCreateComent();
