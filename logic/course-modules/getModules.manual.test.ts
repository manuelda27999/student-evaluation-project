import getModules from "./getModules";

const userId = "W3RxwOPnJXZ2SyEDhhhTQVb5chA3";
const courseId = "uytEidnU3GVsyhNcpbmc";

const handleGetModules = async () => {
  try {
    const response = await getModules(userId, courseId);

    console.log("Modules created successfully:", response);
  } catch (error) {
    console.error("Error getting modules:", error);
  }
};

handleGetModules();
