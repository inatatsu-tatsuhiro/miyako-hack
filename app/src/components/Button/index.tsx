import { styled } from "@stitches/react";
import { Color } from "../../libs/Color";
import React from "react";

type Props = {
  label: string;
  clickHandler: () => void;
};
export const Button: React.FC<Props> = ({ label, clickHandler }) => {
  return <Root onClick={clickHandler}>{label}</Root>;
};

const Root = styled("div", {
  borderRadius: "16px",
  width: "160px",
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  background: Color.primary,
  "&:hover": {
    background: Color.lightGray,
    cursor: "pointer",
  },
});
