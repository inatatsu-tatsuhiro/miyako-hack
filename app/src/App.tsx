import React from 'react'
import { globalCss, styled } from "@stitches/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreatePage } from "./pages/Create";
import { DetailPage } from "./pages/Detail";

const App: React.FC = () => {
  globalStyles();
  return (
    <Root>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreatePage />} />
          <Route path="/:formId" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </Root>
  );
};

export default App;

const Root = styled("div", {
  display: "flex",
  justifyContent: "center",
  paddingTop: "80px",
  paddingBottom: "80px",
});

const globalStyles = globalCss({
  body: {
    height: "100vh",
    background: "linear-gradient(135deg, #60FF8D 0%, #0038FF 100%)",
    backgroundAttachment: "fixed",
    margin: 0,
  },
  "*": {
    letterSpacing: "0.1em",
  },
});