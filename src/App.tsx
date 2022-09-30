import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Color } from "./util/color";
import { Base } from "./Router/Base";
import { RecoilRoot } from "recoil";

const Box = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <ThemeProvider theme={Color}>
      <RecoilRoot>
        <Box>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
              <Route path="/" element={<Base />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
