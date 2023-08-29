import { styled } from "@stitches/react";
import { Color } from "../../libs/Color";
import React, { useEffect, useState } from "react";
import { Problem } from "../../domains/Problem";
import { TextField } from "../TextField";


type Props = {
  problem: Problem;
  input: string,
  setInput: (input: string) => void
};
export const FreeTextTestCard: React.FC<Props> = ({ problem, input,setInput }) => {
  const [title, setTitle] = useState(problem.title)
  const [textField, setTextFiled] = useState('')

  useEffect(() => {
    setInput(textField)
  }, [textField])

  return (
    <Root>
      <Title>
        <TextField label="問題を入力" text={title} setText={setTitle} />
      </Title>
      <Hr />
      <Body>
        <TextField 
          label={"回答を入力"} 
          text={textField} 
          setText={setTextFiled} 
        />
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