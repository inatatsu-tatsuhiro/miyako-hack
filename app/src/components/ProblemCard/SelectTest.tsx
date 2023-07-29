import { styled } from "@stitches/react";
import { Color } from "../../libs/Color";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Select } from "../../domains/Problem";
import { CheckBox } from "../CheckBox";

type Props = {
  problem: Select;
  // changeHandler: (problem: Select) => void;
  select: number[];
  setSelect: (selects: number[]) => void;
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
              const s = !!select.includes(0)
                ? select.filter((e) => e !== 0)
                : [...select, 0];
              setSelect(s);
            }}
            isDefault={false}
          />
          <Answer>{problem.answers[0]}</Answer>
        </Row>
        <Row>
          <CheckBox
            clickHandler={() => {
              const s = !!select.includes(1)
                ? select.filter((e) => e !== 1)
                : [...select, 1];
              setSelect(s);
            }}
            isDefault={false}
          />
          <Answer>{problem.answers[1]}</Answer>
        </Row>
        <Row>
          <CheckBox
            clickHandler={() => {
              const s = !!select.includes(2)
                ? select.filter((e) => e !== 2)
                : [...select, 2];
              setSelect(s);
            }}
            isDefault={false}
          />
          <Answer>{problem.answers[2]}</Answer>
        </Row>
        <Row>
          <CheckBox
            clickHandler={() => {
              const s = !!select.includes(3)
                ? select.filter((e) => e !== 3)
                : [...select, 3];
              setSelect(s);
            }}
            isDefault={false}
          />
          <Answer>{problem.answers[3]}</Answer>
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
