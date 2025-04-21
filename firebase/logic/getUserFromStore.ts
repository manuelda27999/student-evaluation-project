import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../credentials";

const getUserWithEmailFromStore = async (email: string) => {
  try {
    const userQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );

    const querySnapshot = await getDocs(userQuery);

    let user;

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        user = doc.data();
        user.uid = doc.id; // Add the document ID to the user object
      });
    } else {
      console.error("User not found with email:", email);
    }

    return user;
  } catch (error) {
    console.error("Error trying to get user with email:" + error);
  }
};

export default getUserWithEmailFromStore;
