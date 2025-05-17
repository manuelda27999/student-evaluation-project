import registerUser from "./registerUser";

const name = "Albert";
const email = "albert@student.com";
const password = "123123123";
const role = "student";
const courseId = "uytEidnU3GVsyhNcpbmc";

const handleRegisterUser = async () => {
  try {
    const response = await registerUser(name, email, password, role, courseId);
    console.log("User registered successfully: ", response);
  } catch (error) {
    console.error("Error registering user: ", error);
  }
};

handleRegisterUser();
