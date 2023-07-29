import { styled } from "@stitches/react";
import { Color } from "../../libs/Color";
import React from "react";
import { Select } from "../../domains/Problem";


type Props = {
  mode: "PREVIEW" | "EDIT";
  problem: Select;
};
export const SelectCard: React.FC<Props> = ({ mode, problem }) => {
  console.log(mode);
  return (
    <Root>
      <Title>{problem.title}</Title>
      <Hr />
      <Body>
        {problem.answers.map((answer, index) => {
          return <div key={index}>{answer}</div>;
        })}
      </Body>
    </Root>
  );
};

const Root = styled("div", {
  background: Color.pureWhite,
  borderRadius: "16px",
  width: '100%',
})

const Title = styled("div", {
  fontSize: "16px",
  color: Color.text,
  padding: '24px'
})

const Hr = styled("div", {
  background: Color.white,
  height: '1px',
  width: '100%',
})
const Body = styled("div", {
  padding: '24px'
})