import React from "react";
import "../util/index.css";
import { useRecoilValue } from "recoil";
import { startState } from "../util/atom";
import { Box } from "../util/componentStyle";
import { HomeVideo } from "../Components/HomeVideo";
import { HomeCate } from "../Components/HomeCate";
import { Remocon } from "../Components/Remocon";

export const Home = () => {
  const started = useRecoilValue(startState);

  return (
    <Box>
      <HomeVideo />
      {started && (
        <>
          <HomeCate />
          <Remocon />
        </>
      )}
    </Box>
  );
};
