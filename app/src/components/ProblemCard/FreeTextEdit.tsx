import { styled } from "@stitches/react";
import { Color } from "../../libs/Color";
import React, { useEffect, useState } from "react";
import { Problem } from "../../domains/Problem";
import { TextField } from "../TextField";
import { Navigation, Selector } from "../Selector";


type Props = {
  problem: Problem;
  changeHandler: (problem: Problem) => void;
  navigations: Navigation[]
};
export const FreeTextEditCard: React.FC<Props> = ({ problem, changeHandler, navigations }) => {
  const [title, setTitle] = useState(problem.title)
  const [correct, setCorrect] = useState(problem.correct)


  useEffect(() => {
    changeHandler({
        title,
        answers: '',
        type: 'input',
        correct
    })
  }, [title, correct])
  
  return (
    <Root>
      <Title>
        <TextField label="問題を入力" text={title} setText={setTitle} />
        <Selector navigations={navigations} currentState={"INPUT"} />
      </Title>
      <Hr />
      <Body>
        <TextField 
          label={"回答を入力"} 
          text={correct} 
          setText={setCorrect} 
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
  padding: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'end',
  gap: '16px'
})

const Hr = styled("div", {
  background: Color.white,
  height: '1px',
  width: '100%',
})
const Body = styled("div", {
  padding: '24px'
})