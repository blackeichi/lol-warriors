import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Home } from "./Router/Home";
import { Color } from "./util/color";

const Box = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <ThemeProvider theme={Color}>
      <Box>
        <Home />
      </Box>
    </ThemeProvider>
  );
}

export default App;
