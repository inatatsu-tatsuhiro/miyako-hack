import { styled } from "@stitches/react";
import { Color } from "../../libs/Color";
import React from "react";
import { Select } from "../../domains/Problem";


type Props = {
  problem: Select;
};
export const SelectCard: React.FC<Props> = ({ problem }) => {
  const title = problem.title === "" ? "問題が未入力です" : problem.title;
  return (
    <Root>
      <Title>{title}</Title>
      <Hr />
      <Body>
        {problem.answers.map((answer, index) => {
          const ans = answer === "" ? "選択肢が未入力です" : answer;

          return (
            <Answer isCorrect={!!problem.correct.includes(index)} key={index}>
              {ans}
            </Answer>
          );
        })}
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
  fontSize: "20px",
  color: Color.text,
  padding: "24px",
  lineHeight: "44px",
});

const Hr = styled("div", {
  background: Color.white,
  height: "1px",
  width: "100%",
});
const Body = styled("div", {
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});
const Answer = styled("div", {
  borderBottom: "1px solid",
  lineHeight: "44px",
  boxSizing: "border-box",
  padding: "0px 8px",
  fontSize: "16px",
  color: Color.text,
  variants: {
    isCorrect: {
      true: {
        borderColor: Color.primary,
      },
      false: {
        borderColor: Color.lightGray,
      },
    },
  },
});