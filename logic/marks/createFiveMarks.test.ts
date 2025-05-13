import createMark from "./createMark";

const userId = "W3RxwOPnJXZ2SyEDhhhTQVb5chA3";
const courseId = "uytEidnU3GVsyhNcpbmc";
const issuerUserId = "ws2eKMxmbGUmZGztQvpeKN2qFF12";
const moduleId = 3;
const value = 3;

const handleCreateFiveMark = async () => {
  try {
    for (let i = 0; i < 5; i++) {
      await createMark(userId, i, courseId, issuerUserId, moduleId, value);
    }
    console.log("Five marks created successfully");
  } catch (error) {
    console.error("Error creating a Mark:", error);
  }
};

handleCreateFiveMark();
