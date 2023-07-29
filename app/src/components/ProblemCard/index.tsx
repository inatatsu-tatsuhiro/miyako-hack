import React from "react";
import { FreeText, Problem, Select } from "../../domains/Problem";
import { SelectCard } from "./Select";
import { FreeTextCard } from "./FreeText";


type Props = {
  mode: "PREVIEW" | "EDIT";
  problem: Problem;
};
export const ProblemCard: React.FC<Props> = ({ mode, problem }) => {
  if (problem.type === "select") {
    return <SelectCard mode={mode} problem={problem as Select} />;
  }
  return <FreeTextCard mode={mode} problem={problem as FreeText} />;
};
