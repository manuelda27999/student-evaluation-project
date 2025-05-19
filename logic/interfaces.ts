/* Represents a course in the system. */
export interface Course {
  id: string;
  name: string;
}

/* Represents a module in the system */
export interface Module {
  name: string;
  selfEvaluation: boolean;
  teacherEvaluation: boolean;
}
