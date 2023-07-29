import React from "react";
import { FreeText, Problem, Select } from "../../domains/Problem";
import { SelectCard } from "./Select";
import { FreeTextCard } from "./FreeText";
import { SelectEditCard } from "./SelectEdit";

type Props = {
  mode: "PREVIEW" | "EDIT";
  problem: Problem;
  update: (p: Select) => void;
};
export const ProblemCard: React.FC<Props> = ({ mode, problem, update }) => {
  if (problem.type === "select") {
    return mode === "EDIT" ? (
      <SelectEditCard changeHandler={update} problem={problem} />
    ) : (
      <SelectCard problem={problem as Select} />
    );
  }
  return <FreeTextCard problem={problem as FreeText} />;
};
