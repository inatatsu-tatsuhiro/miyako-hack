import React, { useEffect, useState } from "react";
import { Board } from '../../components/Board'
import { styled } from '@stitches/react'
import { Color } from '../../libs/Color'
import { Problem } from "../../domains/Problem";
import { ProblemCard } from "../../components/ProblemCard";
// import { Form } from "../../domains/Form";

const TEMP_TITLE = 'テストのフォームタイトル'

export const DetailPage: React.FC = () => {

  const [title, setTitle] = useState('')

  const [problems, setProblems] = useState<Problem[]>([])
  useEffect(() => {
    setTitle(TEMP_TITLE)
    setProblems([
      {title: 'test problem1', type: 'select', answers: ['aaaa', 'bbbb', 'cccc', 'dddd'], correct: 1},
      {title: 'test problem2', type: 'select', answers: ['aaaa', 'bbbb', 'cccc', 'dddd'], correct: 2},
      {title: 'test problem3', type: 'select', answers: ['aaaa', 'bbbb', 'cccc', 'dddd'], correct: 3},
    ])
  }, [])

  const body = () => {
    return (
      <Body>
        {problems.map((problem) => {
          return (
            <ProblemCard mode="PREVIEW" problem={problem} key={problem.title} />
          );
        })}
      </Body>
    )
  }

  return (
    <Board header={<Title>{title}</Title>} body={body()} />
  )
}

const Title = styled("div", {
  color: Color.text,
  fontSize: "20px"
})
const Body = styled("div", {
  color: Color.text,
  fontSize: "20px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px"
})
