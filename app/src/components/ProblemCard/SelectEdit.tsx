import { styled } from "@stitches/react";
import { Color } from "../../libs/Color";
import React, { useEffect, useState } from "react";
import { Problem } from "../../domains/Problem";
import { TextField } from "../TextField";
import { CheckBox } from "../CheckBox";
import { Navigation, Selector } from "../Selector";

type Props = {
  problem: Problem;
  changeHandler: (problem: Problem) => void;
  navigations: Navigation[]
};
export const SelectEditCard: React.FC<Props> = ({ problem, changeHandler, navigations }) => {
  const [ans1, setAns1] = useState(problem.answers.split(':')[0]);
  const [ans2, setAns2] = useState(problem.answers.split(':')[1]);
  const [ans3, setAns3] = useState(problem.answers.split(':')[2]);
  const [ans4, setAns4] = useState(problem.answers.split(':')[3]);
  const [title, setTitle] = useState(problem.title);
  const [correct, setCorrect] = useState(problem.correct);


  useEffect(() => {
    changeHandler({
      title: title,
      answers: [ans1, ans2, ans3, ans4].join(':'),
      type: "select",
      correct: correct,
    });
  }, [ans1, ans2, ans3, ans4, title, correct]);

  return (
    <Root>
      <Title>
        <TextField label="問題を入力" text={title} setText={setTitle} />
         <Selector navigations={navigations} currentState={"SELECT"} />
      </Title>
      <Hr />
      <Body>
        <Row>
          <CheckBox
            clickHandler={() =>
              setCorrect('0')
            }
            checked={correct === '0'}
          />
          <TextField label="回答を入力" text={ans1} setText={setAns1} />
        </Row>
        <Row>
          <CheckBox
            clickHandler={() =>
              setCorrect('1')
            }
            checked={correct === '1'}
          />
          <TextField label="回答を入力" text={ans2} setText={setAns2} />
        </Row>
        <Row>
          <CheckBox
            clickHandler={() =>
              setCorrect('2')
            }
            checked={correct === '2'}
          />
          <TextField label="回答を入力" text={ans3} setText={setAns3} />
        </Row>
        <Row>
          <CheckBox
            clickHandler={() =>
              setCorrect('3')
            }
            checked={correct === '3'}
          />
          <TextField label="回答を入力" text={ans4} setText={setAns4} />
        </Row>
      </Body>
    </Root>
  );
};

const Root = styled("div", {
  background: Color.pureWhite,
  borderRadius: "16px",
  width: "100%",
});

const Title = styled("div", {
  fontSize: "16px",
  color: Color.text,
  padding: "24px",
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'end',
  gap: '16px'
});

const Hr = styled("div", {
  background: Color.white,
  height: "1px",
  width: "100%",
});
const Body = styled("div", {
  padding: "24px",
});
const Row = styled("div", {
  display: "flex",
  gap: "16px",
  justifyContent: "center",
  alignItems: "center",
});
