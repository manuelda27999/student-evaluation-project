import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth, db } from "../data/credentials";
import { doc, setDoc } from "@firebase/firestore";

const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      password: password,
      role: role,
    });

    console.log("User registered successfully:", userCredential.user.email);

    return userCredential.user;
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

export default registerUser;
