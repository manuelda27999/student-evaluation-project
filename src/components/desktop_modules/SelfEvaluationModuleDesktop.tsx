import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePopup } from "@/context/PopupContext";
import createMark from "../../../logic/marks/createMark";
import createComentFromStudentToTeachers from "../../../logic/coments/createComentFromStudentToTeacher";
import getAspects from "../../../logic/aspects/getAspects";

export default function SelfEvaluationModuleDesktop(props: {
  moduleId: number;
  moduleName: string;
}) {
  const router = useRouter();
  const { openPopup } = usePopup();

  const [values, setValues] = useState([0, 0, 0, 0, 0]);
  const [aspects, setAspects] = useState<string[]>([]);

  const aspectsInformation = [
    "Evalúa tu disposición general frente al módulo: tu interés, energía, iniciativa y constancia. ¿Te has implicado activamente en las sesiones? ¿Has mantenido una actitud positiva y receptiva ante los retos propuestos?",
    "Reflexiona sobre cómo has colaborado con tus compañeros: comunicación, respeto y reparto de tareas. ¿Has contribuido al trabajo común, apoyado a los demás y buscado el consenso en lugar del conflicto?",
    "Considera tu capacidad para trabajar de forma autónoma, sin depender constantemente del apoyo del profesorado. ¿Has sido capaz de organizar tu tiempo, tomar decisiones propias y buscar soluciones por tu cuenta?",
    "Evalúa tu dominio de los conceptos y herramientas técnicas trabajadas en el módulo. ¿Has demostrado competencia al aplicarlas? ¿Has mejorado desde el inicio y sabes identificar tus propios errores o aciertos?",
    "Haz una valoración global de tu desarrollo durante este módulo. Ten en cuenta tu evolución, fortalezas y puntos de mejora. ¿Dónde te situarías respecto al resto del grupo o en relación con tus propias expectativas?",
  ];

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

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    const courseId = sessionStorage.getItem("courseId");

    if (typeof userId === "string" && typeof courseId === "string") {
      handleGetAspects(courseId);
    }
  }, [props.moduleId]);

  const handleGetAspects = async (courseID: string) => {
    try {
      const aspects = await getAspects(courseID);
      setAspects(aspects);
    } catch (error) {
      console.error("Error getting aspects:", error);
    }
  };

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

      router.push("/");
    } catch (error) {
      console.error("Error sending self evaluation:", error);
    }
  };

  const handleOpenPopup = (title: string, content: string) => {
    openPopup(title, content);
  };

  return (
    <div className="h-full w-full flex flex-col items-start justify-start ">
      <div className="h-16 p-5 w-full flex flex-row justify-start items-center">
        <h2 className="text-2xl font-bold text-[var(--primary)]">
          Autoevaluación
        </h2>
      </div>

      <div className="w-full h-full flex flex-row items-start bg-white">
        <form
          action="submit"
          className="w-full px-18 py-4 flex flex-col items-start justify-start"
          onSubmit={handleSendSelfEvaluation}
        >
          <div className="w-full h-full flex flex-row">
            <div className="w-3/5 pr-16">
              {aspects &&
                aspects.map((aspect, index) => {
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
                          className="cursor-pointer"
                          onClick={(event) => {
                            event.preventDefault();
                            handleOpenPopup(aspect, aspectsInformation[index]);
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
                        className="w-full cursor-pointer"
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
            </div>

            <div className="w-2/5 flex flex-col items-start justify-start mb-6">
              <div>
                <label
                  htmlFor="coment"
                  className="text-xl font-semibold text-black mr-1 underline"
                >
                  Comentario
                </label>
                <button
                  className="cursor-pointer"
                  onClick={(event) => {
                    event.preventDefault();
                    handleOpenPopup(
                      "Comentario",
                      "En este apartado podrás hablar de cuales son tus sensaciones durante el curso, si quieres darnos feedback sobre algún punto en específico o si hay algo que debamos saber durante el desarollo de este módulo."
                    );
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
                className="w-full h-10/12 border-2 border-gray-500 rounded-md p-2 mt-2 text-black"
              ></textarea>
            </div>
          </div>
          <button className="bg-[var(--secondary)] text-white text-lg rounded-md p-3 mt-2 w-fit font-bold cursor-pointer">
            Enviar autoevaluación y comentario
          </button>
        </form>
      </div>
    </div>
  );
}
