import getAspects from "./getAspects";

const courseId = "uytEidnU3GVsyhNcpbmc";

const handleGetAspects = async () => {
  try {
    const aspects = await getAspects(courseId);
    console.log("Aspects retrieved successfully:", aspects);
  } catch (error) {
    console.error("Error getting aspects:", error);
  }
};

handleGetAspects();
