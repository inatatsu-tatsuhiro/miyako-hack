import { styled } from "@stitches/react";
import { Color } from "../../libs/Color";
import React, { useEffect, useState } from "react";
import { Problem, Select } from "../../domains/Problem";
import { TextField } from "../TextField";
import { CheckBox } from "../CheckBox";

type Props = {
  problem: Select;
  changeHandler: (problem: Select) => void;
};
export const SelectEditCard: React.FC<Props> = ({ problem, changeHandler }) => {
  const [ans1, setAns1] = useState(problem.answers[0]);
  const [ans2, setAns2] = useState(problem.answers[1]);
  const [ans3, setAns3] = useState(problem.answers[2]);
  const [ans4, setAns4] = useState(problem.answers[3]);
  const [title, setTitle] = useState(problem.title);
  const [correct, setCorrect] = useState(problem.correct);

  useEffect(() => {
    changeHandler({
      title: title,
      answers: [ans1, ans2, ans3, ans4],
      type: "select",
      correct: correct,
    });
  }, [ans1, ans2, ans3, ans4, title, correct]);

  return (
    <Root>
      <Title>
        <TextField label="問題を入力" text={title} setText={setTitle} />
      </Title>
      <Hr />
      <Body>
        <Row>
          <CheckBox
            clickHandler={() =>
              setCorrect((prev) =>
                !!prev.includes(0) ? prev.filter((p) => p !== 0) : [...prev, 0]
              )
            }
            isDefault={!!correct.includes(0)}
          />
          <TextField label="回答を入力" text={ans1} setText={setAns1} />
        </Row>
        <Row>
          <CheckBox
            clickHandler={() =>
              setCorrect((prev) =>
                !!prev.includes(1) ? prev.filter((p) => p !== 1) : [...prev, 1]
              )
            }
            isDefault={!!correct.includes(1)}
          />
          <TextField label="回答を入力" text={ans2} setText={setAns2} />
        </Row>
        <Row>
          <CheckBox
            clickHandler={() =>
              setCorrect((prev) =>
                !!prev.includes(2) ? prev.filter((p) => p !== 2) : [...prev, 2]
              )
            }
            isDefault={!!correct.includes(2)}
          />
          <TextField label="回答を入力" text={ans3} setText={setAns3} />
        </Row>
        <Row>
          <CheckBox
            clickHandler={() =>
              setCorrect((prev) =>
                !!prev.includes(3) ? prev.filter((p) => p !== 3) : [...prev, 3]
              )
            }
            isDefault={!!correct.includes(3)}
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
