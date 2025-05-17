"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase/credentials";
import { onAuthStateChanged } from "firebase/auth";

export default function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
        return true;
      } else {
        router.push("/login");
        return false;
      }
    });

    return () => unsubscribe();
  }, []);
}
