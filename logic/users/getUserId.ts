import { getAuth, onAuthStateChanged } from "firebase/auth";

const getUserId = async () => {
  const auth = getAuth();

  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return user.uid;
      } else {
        console.log("No user is signed in.");
        return null;
      }
    });
  } catch (error) {
    console.error("Error getting user ID:", error);
  }
};

export default getUserId;
