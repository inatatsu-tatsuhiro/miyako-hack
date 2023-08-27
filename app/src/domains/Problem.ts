export type Problem = {
  type: "select" | "input";
  title: string;
  answers: string;
  correct: string;
}

export const InitProblem: Problem = {
  type: "select",
  title: "",
  answers: ":::",
  correct: "",
};