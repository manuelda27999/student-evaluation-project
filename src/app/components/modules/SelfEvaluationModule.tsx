import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import createMark from "../../../../logic/marks/createMark";
import createComentFromStudentToTeachers from "../../../../logic/coments/createComentFromStudentToTeacher";

export default function SelfEvaluationModule(props: {
  aspects: string[];
  moduleId: number;
}) {
  const [values, setValues] = useState([0, 0, 0, 0, 0]);
  const [aspects, setAspects] = useState<string[]>([
    "Actitud",
    "Trabajo en \nequipo",
    "Independencia",
    "Nivel técnico",
    "Posicionamiento \ngeneral",
  ]);

  const router = useRouter();

  useEffect(() => {
    const targetValue = 20;
    const interval = 40;
    let currentValue = 0;

    const intervalId = setInterval(() => {
      if (currentValue < targetValue) {
        currentValue++;
        setValues(Array(5).fill(currentValue));
      } else {
        clearInterval(intervalId);
      }
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleChange = (index: number, value: number) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const handleSendSelfEvaluation = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const coment = data.coment as string;

    const userId = sessionStorage.getItem("userId") as string;
    const courseId = sessionStorage.getItem("courseId") as string;

    try {
      values.forEach((value, index) => {
        createMark(
          userId,
          index,
          courseId,
          userId,
          props.moduleId,
          Math.round(value / 10)
        );
      });

      createComentFromStudentToTeachers(
        coment,
        courseId,
        props.moduleId,
        userId
      );

      router.push("/home");
    } catch (error) {
      console.error("Error sending self evaluation:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-start justify-start pt-18">
      <h2 className="text-3xl font-semibold text-black pt-3 pl-3">
        Autoevaluación
      </h2>
      <div className="w-full h-full flex flex-row items-start bg-white  p-4">
        <form
          action="submit"
          className="w-full flex flex-col items-center justify-start"
          onSubmit={handleSendSelfEvaluation}
        >
          {aspects.map((aspect, index) => {
            return (
              <div
                key={index}
                className="w-full flex flex-col items-start justify-start mb-6"
              >
                <div className="flex flex-row items-center mb-2">
                  <label
                    htmlFor={aspect}
                    className="text-xl font-semibold text-black mr-1 underline"
                  >
                    {aspect}
                  </label>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      console.log("info");
                    }}
                  >
                    <img
                      src="/informacion.png"
                      alt="Botón de información"
                      className="w-4 pb-4"
                    />
                  </button>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  id={aspect}
                  className="w-full"
                  value={values[index]}
                  onChange={(e) => {
                    handleChange(index, parseInt(e.target.value));
                  }}
                />
                <div className="flex flex-row items-center justify-between w-full mt-2">
                  <p className="text-black font-semibold">Nada</p>
                  <p className="text-black font-semibold">Destaca</p>
                </div>
              </div>
            );
          })}
          <div className="w-full flex flex-col items-start justify-start mb-6">
            <div>
              <label
                htmlFor="coment"
                className="text-xl font-semibold text-black mr-1 underline"
              >
                Comentario
              </label>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  console.log("info");
                }}
              >
                <img
                  src="/informacion.png"
                  alt="Botón de información"
                  className="w-4 pb-2"
                />
              </button>
            </div>

            <textarea
              name="coment"
              id="coment"
              className="w-11/12 h-48 border-2 border-gray-500 rounded-md p-2 mx-auto mt-2 text-black"
            ></textarea>
          </div>
          <button className="bg-[var(--secondary)] text-white rounded-md p-2 mb-4 w-48 font-bold">
            Enviar autoevaluación
          </button>
        </form>
      </div>
    </div>
  );
}
