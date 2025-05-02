import { useState } from "react";

export default function SelfEvaluationModule() {
  const [values, setValues] = useState([5, 5, 5, 5, 5]);
  const [tittle, setTitle] = useState(0);
  const [text, setText] = useState(0);

  const labels = [
    "Nada",
    "Pobre",
    "Insuficiente",
    "Regular",
    "Aceptable",
    "Bien",
    "Muy bien",
    "Notable",
    "Excelente",
    "Sobresaliente",
  ];

  const criteria = [
    "Actitud",
    "Trabajo en equipo",
    "Independencia",
    "Nivel técnico",
    "Posicionamiento general",
  ];

  const criteriaDescriptions = [
    "Se evalúa la disposición general del estudiante frente al aprendizaje, incluyendo su grado de interés, motivación, actitud proactiva, puntualidad y respeto hacia los compañeros y el profesorado.",
    "Se valora cómo el estudiante interactúa dentro de un grupo, su capacidad para escuchar, proponer ideas, asumir responsabilidades compartidas y contribuir al logro de objetivos comunes sin generar conflictos.",
    "Se analiza la autonomía del estudiante a la hora de afrontar tareas, su iniciativa para buscar soluciones por sí mismo y su capacidad para gestionar su tiempo y recursos sin depender constantemente de orientación externa.",
    "Se tiene en cuenta el dominio de las herramientas, tecnologías o conocimientos técnicos propios del módulo, así como la precisión, la eficacia y la calidad en la ejecución de tareas técnicas.",
    "Se realiza una valoración global del estudiante considerando todos los aspectos anteriores, su evolución a lo largo del módulo, el nivel de implicación mostrado y el impacto positivo de su presencia en el entorno de aprendizaje.",
  ];

  const handleChange = (index: number, value: number) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  return (
    <div className="w-full h-full flex flex-col items-start justify-start p-12">
      <h2 className="text-3xl font-bold text-black mb-4">Autoevaluación</h2>
      <div className="w-full h-full flex flex-row items-start bg-white  p-4">
        <form
          action="submit"
          className="w-3/5 flex flex-col items-center justify-start"
        >
          {criteria.map((criterion, index) => {
            return (
              <div
                key={index}
                className="w-full flex flex-col items-start justify-start mb-8"
              >
                <div className="flex flex-row items-center mb-2">
                  <label
                    htmlFor={criterion}
                    className="text-xl font-semibold text-black mr-2 cursor-pointer underline"
                    onClick={() => {
                      setTitle(index);
                      setText(index);
                    }}
                  >
                    {criterion + ":"}
                  </label>
                  <p className="text-center text-lg text-black">
                    {labels[values[index] - 1]}
                  </p>
                </div>

                <input
                  type="range"
                  min="1"
                  max="10"
                  id={criterion}
                  className="w-full"
                  onChange={(e) => {
                    handleChange(index, parseInt(e.target.value));
                  }}
                />
              </div>
            );
          })}
          <button className="bg-[var(--secondary)] text-white rounded-md p-2 mb-4 w-48 font-bold">
            Enviar autoevaluación
          </button>
        </form>
        <div className="w-2/5 flex flex-col items-center justify-start">
          <div className="bg-[var(--primary)] max-w-80 p-6 rounded-lg flex flex-col items-center">
            <h4 className="text-2xl font-bold mb-4">{criteria[tittle]}</h4>
            <p className="text-lg text-center">{criteriaDescriptions[text]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
