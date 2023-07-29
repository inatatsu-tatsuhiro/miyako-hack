import { styled } from "@stitches/react";
import { Color } from "../../libs/Color";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  label: string;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};
export const TextField: React.FC<Props> = ({ label, text, setText }) => {
  return (
    <Input
      onChange={(e) => setText(e.target.value)}
      value={text}
      placeholder={label}
    />
  );
};
const Input = styled("input", {
  background: Color.pureWhite,
  border: "none",
  outline: "none",
  height: "44px",
  width: "100%",
  padding: "0px 16px",
  borderBottom: `1px solid ${Color.gray}`,
  boxSizing: "border-box",
  "&::placeholder": {
    fontSize: "14px",
  },
});
