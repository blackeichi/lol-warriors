import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import "../util/index.css";

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: -1;
`;
const OverVideo = styled.video`
  width: 100%;
  left: 0;
  filter: blur(15px);
  scale: 1.1;
`;
const Content = styled.div`
  width: 100%;
  max-width: 1300px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const Line = styled.div`
  position: absolute;
  width: 97%;
  height: 105%;
  border: 3px solid gray;
  z-index: 2;
  border-radius: 0 0 0;
`;
const Video = styled.video`
  width: 100%;
`;
const TextBox = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const Logo = styled.img`
  width: 40vw;
`;
const Start = styled(motion.div)`
  border: 1px solid white;
  padding: 5px;
`;
const Btn = styled.h1`
  background-color: ${(props) => props.theme.blueColr};
  padding: 15px 70px;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
`;

export const Home = () => {
  return (
    <Box className="App">
      <Overlay>
        <OverVideo muted autoPlay loop>
          <source src="videos/main-video.webm" type="video/webm" />
        </OverVideo>
      </Overlay>
      <Content>
        <Line />
        <Video muted autoPlay loop>
          <source src="videos/main-video.webm" type="video/webm" />
        </Video>
        <TextBox>
          <Logo src="img/lol.png" />
          <Start>
            <Btn>시작하기</Btn>
          </Start>
        </TextBox>
      </Content>
    </Box>
  );
};
