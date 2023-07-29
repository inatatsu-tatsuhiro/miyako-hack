import { styled } from "@stitches/react";
import { Color } from "../../libs/Color";
import React from "react";
import { Problem } from "../../domains/Problem";


type Props = {
  problem: Problem;
};
export const FreeTextCard: React.FC<Props> = ({ problem }) => {
  return (
    <Root>
      <Title>{problem.title}</Title>
      <Hr />
      <Body>{problem.title}</Body>
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