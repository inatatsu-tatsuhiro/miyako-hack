import React from 'react'
import { styled } from '@stitches/react'
import { Color } from './libs/Color'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreatePage } from './pages/Create'
import { DetailPage } from './pages/Detail'

const App: React.FC = () => {
  return (
    <HTML>
      <Root>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CreatePage />} />
            <Route path="/:formId" element={<DetailPage />} />
          </Routes>
        </BrowserRouter>
      </Root>
    </HTML>
  )
}

export default App

const Root = styled("div", {
  display: "flex",
  justifyContent: "center",
  paddingTop: "80px",
})

const HTML = styled("div", {
  height: "100vh",
  background: Color.background,
})