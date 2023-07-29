import { styled } from "@stitches/react";
import { Color } from "../../libs/Color";
import React, { FC } from "react";


type Props = {
  header: React.ReactNode
  body: React.ReactNode
}
export const Board: FC<Props> = ({header, body}) => {
  return (
    <Root>
      <Title>
        {header}
      </Title>
      <Hr />
      <Body>
        {body}
      </Body>
    </Root>
  )
}

const Root = styled("div", {
  background: Color.white,
  borderRadius: "16px",
  width: "800px",
  boxShadow: "2px 4px 8px 0px rgba(0, 0, 0, 0.25)"
})
const Title = styled("div", {
  padding: "20px"
})
const Hr = styled("div", {
  background: Color.pureWhite,
  height: '1px',
  width: '100%',
})

const Body = styled("div", {
  padding: "20px"
})