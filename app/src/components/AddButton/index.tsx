import { styled } from "@stitches/react";
import { Color } from "../../libs/Color";
import React from "react";


type Props = {
  clickHandler: () => void
}
export const AddButton: React.FC<Props> = ({clickHandler}) => {
  return (
    <Root onClick={clickHandler}>+</Root>
  )
}

const Root = styled("div", {
  borderRadius: "16px",
  width: "160px",
  height: "80px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "40px",
  "&:hover": {
    background: Color.lightGray,
    cursor: "pointer",
  }
})