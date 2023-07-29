export type Select = {
  type: 'select',
  title: string,
  answers: string[]
  correct: number
}

export type FreeText = {
  type: 'input',
  title: string,
  correct: string
}

export type Problem = Select | FreeText

export const InitProblem: Problem = {
  type: "select",
  title: "aaaa",
  answers: ["", "", "", ""],
  correct: 0,
};