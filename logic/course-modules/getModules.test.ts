import getModules from "./getModules";

const userId = "W3RxwOPnJXZ2SyEDhhhTQVb5chA3";
const courseId = "uytEidnU3GVsyhNcpbmc";

const handleGetModules = async () => {
  try {
    const modules = await getModules(userId, courseId);

    console.log("Modules:", modules);
  } catch (error) {
    console.error("Error getting modules:", error);
  }
};

handleGetModules();
