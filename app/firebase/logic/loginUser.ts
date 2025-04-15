import { auth } from "../../app/firebase/data/credentials.ts";
import { signInWithEmailAndPassword } from "@firebase/auth";

const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in successfully:", userCredential.user.uid);
  } catch (error) {
    console.error("Error logging in user:", error);
  }
};

export default loginUser;
