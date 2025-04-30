import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth, db } from "../../credentials";
import { doc, setDoc } from "@firebase/firestore";

const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string,
  course: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    const courseCreated = await getDocs(doc(db, "courses", course));

    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      role: role,
      cours: course,
    });

    console.log("User registered successfully:", userCredential.user.email);

    return userCredential.user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export default registerUser;
