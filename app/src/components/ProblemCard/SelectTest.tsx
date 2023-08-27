import { styled } from "@stitches/react";
import { Color } from "../../libs/Color";
import React from "react";
import { Problem } from "../../domains/Problem";
import { CheckBox } from "../CheckBox";

type Props = {
  problem: Problem;
  select: string;
  setSelect: (input: string) => void
};
export const SelectTestCard: React.FC<Props> = ({
  problem,
  select,
  setSelect,
}) => {
  return (
    <Root>
      <Title>{problem.title}</Title>
      <Hr />
      <Body>
        <Row>
          <CheckBox
            clickHandler={() => {
              setSelect('0');
            }}
            checked={select === '0'}
          />
          <Answer>{problem.answers.split(':')[0]}</Answer>
        </Row>
        <Row>
          <CheckBox
            clickHandler={() => {
              setSelect('1');
            }}
            checked={select === '1'}
          />
          <Answer>{problem.answers.split(':')[1]}</Answer>
        </Row>
        <Row>
          <CheckBox
            clickHandler={() => {
              setSelect('2');
            }}
            checked={select === '2'}
          />
          <Answer>{problem.answers.split(':')[2]}</Answer>
        </Row>
        <Row>
          <CheckBox
            clickHandler={() => {
              setSelect('3');
            }}
            checked={select === '3'}
          />
          <Answer>{problem.answers.split(':')[3]}</Answer>
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
  justifyContent: "start",
  alignItems: "center",
});

const Answer = styled("div", {
  lineHeight: "44px",
  padding: "0px 8px",
  fontSize: "16px",
  color: Color.text,
});
