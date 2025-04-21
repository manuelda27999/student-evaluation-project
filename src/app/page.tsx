"use client";
import useAuthRedirect from "@/lib/useAuthRedirect";
import { useRouter } from "next/navigation";
import logoutUser from "../../firebase/logic/logoutUser";

export default function Home() {
  useAuthRedirect();
  const route = useRouter();

  const handleLogout = () => {
    try {
      logoutUser().then(() => {
        console.log("User logged out successfully");
        route.push("/login");
      });
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  };

  return (
    <main>
      <div className="flex flex-col items-center justify-start h-screen w-screen bg-background">
        <header className="flex items-center w-screen pl-4 pt-4">
          <img
            src="./logoHeader.png"
            alt="Logo de Eurofirms University"
            className="h-12 mr-8 ml-4"
          />
          <h1 className="text-3xl font-bold">Tech Academy</h1>
        </header>
        <main className="h-4/5 w-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Bienvenido a la Tech Academy</h1>
          <button
            className="bg-cyan-500 text-white rounded-md p-2 mb-4 w-48 mt-3 font-bold cursor-pointer "
            onClick={handleLogout}
          >
            Log-out
          </button>
        </main>
      </div>
    </main>
  );
}
