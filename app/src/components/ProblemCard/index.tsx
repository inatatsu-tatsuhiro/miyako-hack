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
  if (problem.type === "select") {
    return mode === "EDIT" ? (
      <SelectEditCard changeHandler={update} problem={problem} />
    ) : (
      <SelectCard problem={problem} />
    );
  } else {
    return mode === "EDIT" ? (
      <FreeTextEditCard changeHandler={update} problem={problem} />
    ) : (
      <FreeTextCard problem={problem} />
    );
  }
};
