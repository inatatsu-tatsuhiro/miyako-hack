import React from "react";
import { Problem } from "../../domains/Problem";
import { SelectCard } from "./Select";
import { FreeTextCard } from "./FreeText";
import { SelectEditCard } from "./SelectEdit";
import { FreeTextEditCard } from "./FreeTextEdit";

type Props = {
  mode: "PREVIEW" | "EDIT" | "TEST";
  problem: Problem;
  update: (p: Problem) => void;
};
export const ProblemCard: React.FC<Props> = ({ mode, problem, update }) => {

  const navigations = [
    {
      state: "INPUT",
      label: "入力",
      action: () => {
        update({
          title: '',
          answers: '',
          type: 'input',
          correct: ''
        })
      }
    },
    {
      state: "SELECT",
      label: "選択",
      action: () => {
        update({
          title: '',
          answers: '',
          type: 'select',
          correct: ''
        })
      }
    }
  ]

  // console.log('pro', problem)

  if (problem.type === "select") {
    return mode === "EDIT" ? (
      <SelectEditCard changeHandler={update} problem={problem} navigations={navigations}/>
    ) : (
      <SelectCard problem={problem} />
    );
  } else {
    return mode === "EDIT" ? (
      <FreeTextEditCard changeHandler={update} problem={problem} navigations={navigations} />
    ) : (
      <FreeTextCard problem={problem} />
    );
  }
};
