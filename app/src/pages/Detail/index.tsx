import React, { useEffect, useState } from "react";
import { Board } from '../../components/Board'
import { styled } from '@stitches/react'
import { Color } from '../../libs/Color'
import { Problem, Select } from "../../domains/Problem";
import { ProblemCard } from "../../components/ProblemCard";
import { GetForm } from "../../libs/FormHandler";
import { useParams } from "react-router";

export const DetailPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const { formId } = useParams();

  const [problems, setProblems] = useState<Problem[]>([]);
  useEffect(() => {
    GetForm(`${formId}`).then((data) => {
      setProblems(data.problems);
      setTitle(data.title);
    });
  }, []);

  const body = () => {
    return (
      <Body>
        {problems.map((problem) => {
          return (
            <ProblemCard
              mode="PREVIEW"
              problem={problem}
              key={problem.title}
              update={function (p: Select): void {
                throw new Error("Function not implemented.");
              }}
            />
          );
        })}
      </Body>
    );
  };

  return <Board header={<Title>{title}</Title>} body={body()} />;
};

const Title = styled("div", {
  color: Color.text,
  fontSize: "20px"
})
const Body = styled("div", {
  color: Color.text,
  fontSize: "20px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px"
})
