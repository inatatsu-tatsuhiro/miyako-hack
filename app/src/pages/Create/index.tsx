import React, { useEffect, useState } from "react";
import { Board } from "../../components/Board";
import { AddButton } from "../../components/AddButton";
import { styled } from "@stitches/react";
import { Color } from "../../libs/Color";
import axios from "axios";
import { TextField } from "../../components/TextField";
import { InitProblem, Select } from "../../domains/Problem";
import { Selector } from "../../components/Selector";
import { ProblemCard } from "../../components/ProblemCard";
import { Button } from "../../components/Button";
import { Form } from "../../domains/Form";
import { CreateForm } from "../../libs/FormHandler";
import { useNavigate } from "react-router";

export const CreatePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [problems, setProblems] = useState<Select[]>([]);
  const [currentState, setCurrentState] = useState<"PREVIEW" | "EDIT">("EDIT");
  const navi = useNavigate();
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
    const newProblems = [...problems];
    newProblems.push(InitProblem);
    setProblems(newProblems);
  };

  const updateProblem = (index: number, newProblem: Select) => {
    console.log(newProblem);
    const newProblems = [...problems].map((p, i) => {
      const s: Select = {
        type: "select",
        title: index === i ? newProblem.title : p.title,
        correct: index === i ? newProblem.correct : p.correct,
        answers: index === i ? newProblem.answers : p.answers,
      };
      return s;
    });
    setProblems(newProblems);
  };

  const submit = () => {
    const form: Form = {
      title,
      problems,
    };
    CreateForm(form).then((data) => {
      navi(`/${data}`);
    });
  };

  const header = () => {
    if (currentState === "PREVIEW") {
      return (
        <Header>
          <Title>{title}</Title>
          <Selector navigations={navigations} currentState={currentState} />
        </Header>
      );
    }

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
          {problems.map((problem, index) => {
            return (
              <ProblemCard
                problem={problem}
                mode={currentState}
                update={(p: Select) => updateProblem(index, p)}
              />
            );
          })}
          {currentState === "PREVIEW" ? (
            <Button clickHandler={submit} label="作成" />
          ) : (
            <AddButton clickHandler={addProblem} />
          )}
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
  gap: "20px",
});

const Header = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
});
const Title = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  height: "44px",
});
