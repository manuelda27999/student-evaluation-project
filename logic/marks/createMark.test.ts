import createMark from "./createMark";

const userId = "W3RxwOPnJXZ2SyEDhhhTQVb5chA3";
const aspectId = 4;
const courseId = "uytEidnU3GVsyhNcpbmc";
const issuerUserId = "ws2eKMxmbGUmZGztQvpeKN2qFF12";
const moduleId = 1;
const value = 4;

const handleCreateMark = async () => {
  try {
    await createMark(userId, aspectId, courseId, issuerUserId, moduleId, value);
    console.log("Mark created successfully");
  } catch (error) {
    console.error("Error creating a Mark:", error);
  }
};

handleCreateMark();
