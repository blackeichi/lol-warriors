import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Color } from "./util/color";
import { Search } from "./Router/Search";
import { useSetRecoilState } from "recoil";
import { Summoner } from "./Router/Summoner";
import { resizeState } from "./util/atom";

const Box = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  const [screen, setScreen] = useState(window.outerWidth);
  const setLarge = useSetRecoilState(resizeState);
  useEffect(() => {
    const handleResize = () => {
      setScreen(window.outerWidth);
    };
    window.addEventListener("resize", handleResize);
    if (screen >= 980) {
      setLarge("Web");
    } else if (screen <= 700 && screen > 560) {
      setLarge("Mobile");
    } else if (screen <= 560) {
      setLarge("Small");
    } else {
      setLarge("Mid");
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <ThemeProvider theme={Color}>
      <Box>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/summoner" element={<Summoner />} />
          </Routes>
        </HashRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
