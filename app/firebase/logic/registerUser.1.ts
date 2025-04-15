import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../data/credentials.js";

const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User registered successfully:", userCredential.user.email);
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

export default registerUser;
