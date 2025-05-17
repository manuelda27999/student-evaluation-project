import createModule from "./createModule";

const courseId = "Z1W18iRBoPM24wkggyET";
const moduleName = "Módulo de civerseguridad 2";

const handleCreateModule = async () => {
  try {
    const response = await createModule(courseId, moduleName);
    console.log("Module created successfully: ", response);
  } catch (error) {
    console.error("Error creating module", error);
  }
};

handleCreateModule();
