import React, { useEffect, useState } from "react";
import { Board } from "../../components/Board";
import { AddButton } from "../../components/AddButton";
import { styled } from "@stitches/react";
import { Color } from "../../libs/Color";
import axios from "axios";
import { TextField } from "../../components/TextField";
import { InitProblem, Problem } from "../../domains/Problem";
import { Selector } from "../../components/Selector";
// import { Form } from "../../domains/Form";

export const CreatePage: React.FC = () => {
  // const [forms] = useState<Form>(
  //   {
  //     title: 'test',
  //     problems: [
  //       {title: 'test problem1', type: 'select', answers: ['aaaa','bbbb', 'cccc', 'dddd' ], correct: 1},
  //       {title: 'test problem2', type: 'select', answers: ['aaaa','bbbb', 'cccc', 'dddd' ], correct: 2},
  //       {title: 'test problem3', type: 'select', answers: ['aaaa','bbbb', 'cccc', 'dddd' ], correct: 0},
  //       {title: 'test problem4', type: 'input', correct: 'answer'}
  //     ]
  //   }
  // )

  const [title, setTitle] = useState("");
  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentState, setCurrentState] = useState("PREVIEW");

  const navigations = [
    {
      state: "PREVIEW",
      label: "確認",
      action: () => {
        console.log("click preview");
        setCurrentState("PREVIEW");
      },
    },
    {
      state: "EDIT",
      label: "編集",
      action: () => {
        console.log("click edit");
        setCurrentState("EDIT");
      },
    },
  ];

  useEffect(() => {
    axios
      .get(`https://endpoint-5uak4tcxtq-uc.a.run.app/v1/health`)
      .then((data) => {
        console.log(data);
      });
  }, []);

  const addProblem = () => {
    console.log("add problem");
    const newProblems = [...problems];
    newProblems.push(InitProblem);
    setProblems(newProblems);
  };

  const header = () => {
    return (
      <Header>
        <TextField label={"Title"} text={title} setText={setTitle} />
        <Selector navigations={navigations} currentState={currentState} />
      </Header>
    );
  };
  return (
    <Board
      header={header()}
      body={
        <Body>
          {problems.map((problem) => {
            return <div key={problem.title}>{problem.title}</div>;
          })}
          <AddButton clickHandler={addProblem} />
        </Body>
      }
    />
  );
};

const Body = styled("div", {
  color: Color.text,
  fontSize: "20px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Header = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
});
