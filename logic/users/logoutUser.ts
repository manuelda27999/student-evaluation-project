import { signOut } from "firebase/auth";
import { auth } from "../../firebase/credentials";

const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out user:", error);
  }
};

export default logoutUser;
