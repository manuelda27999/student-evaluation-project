import createMark from "./createMark";

const userId = "W3RxwOPnJXZ2SyEDhhhTQVb5chA3";
const courseId = "uytEidnU3GVsyhNcpbmc";
const issuerUserId = "ws2eKMxmbGUmZGztQvpeKN2qFF12";
const moduleId = 4;
const values = [3, 4, 4, 3, 4];

const handleCreateFiveMark = async () => {
  try {
    for (let i = 0; i < 5; i++) {
      await createMark(userId, i, courseId, issuerUserId, moduleId, values[i]);
    }
    console.log("Five marks created successfully");
  } catch (error) {
    console.error("Error creating a Mark:", error);
  }
};

handleCreateFiveMark();
