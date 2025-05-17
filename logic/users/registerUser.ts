import { createUserWithEmailAndPassword, deleteUser } from "@firebase/auth";
import { auth, db } from "../../firebase/credentials";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "@firebase/firestore";

const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string,
  courseId: string
) => {
  if (typeof email !== "string" || typeof password !== "string")
    throw new Error("Email and password must be strings.");

  if (!name || name.trim().length < 3)
    throw new Error("Name must be at least 3 characters long.");

  if (!email.includes("@") || email.length < 6)
    throw new Error("Invalid email address.");

  if (password.length < 6)
    throw new Error("Password must be at least 6 characters long.");

  if (!["student", "teacher"].includes(role))
    throw new Error("Role must be either 'student' or 'teacher'.");

  const cleanedName = name.trim();
  const cleanedEmail = email.trim();

  try {
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      throw new Error("The specified course does not exist.");
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      cleanedEmail,
      password
    );

    const user = userCredential.user;

    try {
      await setDoc(doc(db, "users", user.uid), {
        name: cleanedName,
        email: cleanedEmail,
        role,
        marks: [],
        coments: [],
        courses: [courseRef],
      });

      await updateDoc(courseRef, {
        students: arrayUnion(doc(db, "users", user.uid)),
      });
    } catch (error) {
      await deleteUser(user);

      throw new Error("User created but failed to save user data.");
    }

    return {
      uid: user.uid,
      email: user.email,
      message: "User registered successfully",
    };
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error("The email address is already in use.");
    }

    throw new Error(error.message);
  }
};

export default registerUser;
