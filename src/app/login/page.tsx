"use client";

import loginUser from "../../../logic/users/loginUser";
import useAuthRedirect from "@/lib/useAuthRedirect";
import { useRouter } from "next/navigation";

export default function Login() {
  useAuthRedirect();
  const route = useRouter();

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const username = data.username as string;
    const password = data.password as string;

    try {
      loginUser(username, password).then((userCredential) => {
        if (userCredential) {
          console.log("Credenciales del usuario: ");
          console.log(userCredential?.uid);
          route.push("/");
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-start h-screen w-screen bg-primary">
      <header className="flex items-center w-screen p-4 justify-between md:justify-start">
        <img
          src="./logoHeader.png"
          alt="Logo de Eurofirms University"
          className="h-12 md:mr-8"
        />
        <h1 className="text-3xl font-bold w-min sm:w-fit sm:ml-0">
          Tech Academy
        </h1>
      </header>{" "}
      <main className="h-4/5 w-full flex flex-col items-center justify-center">
        <form
          className="flex flex-col justify-center items-center w-3/5 max-w-[700px]"
          action=""
          onSubmit={handleLogin}
        >
          <div className="flex flex-col w-full mb-3">
            <div className="flex items-center mb-1">
              <img
                src="./userLogo.png"
                alt="Logo de usuario"
                className="w-6 mr-2"
              />
              <label htmlFor="username" className="text-xl">
                Nombre de usuario
              </label>
            </div>
            <input
              className="bg-white rounded-md p-2 mb-4 text-black"
              type="text"
              name="username"
              id="username"
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center mb-1">
              <img
                src="./passwordLogo.png"
                alt="Logo de candado"
                className="w-6 mr-2"
              />
              <label htmlFor="password" className="text-xl">
                Contraseña
              </label>
            </div>
            <input
              className="bg-white rounded-md p-2 mb-4 text-black"
              type="password"
              name="password"
              id="password"
            />
          </div>

          <button className="bg-[var(--secondary)] text-white rounded-md p-2 mb-4 w-48 mt-3 font-bold cursor-pointer">
            Iniciar sesión
          </button>
        </form>
      </main>
    </div>
  );
}
