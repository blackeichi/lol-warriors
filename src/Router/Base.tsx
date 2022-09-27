import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../util/index.css";

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Overlay = styled.div`
  width: 100%;
  height: 80vh;
  overflow: hidden;
  position: absolute;
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
  width: 95%;
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
  z-index: 2;
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
  border: 2px solid white;
  padding: 5px;
  cursor: pointer;
`;
const Btn = styled(motion.h1)`
  background-color: ${(props) => props.theme.blueColr};
  padding: 15px 70px;
  font-size: 14px;
  font-family: "MonoplexKR-Regular";
`;

const boxMove = {
  onStart: {
    top: 0,
    display: "flex",
  },
  onEnd: {
    top: -2000,
    transition: {
      duration: 2,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

export const Base = () => {
  const [started, setStarted] = useState(false);
  return (
    <Box className="App">
      <VideoBox variants={boxMove} animate={started ? "onEnd" : "onStart"}>
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
            <Start
              onClick={() => {
                setStarted(true);
              }}
              whileHover={{
                border: "5px solid rgba(255,255,255,0.7)",
              }}
              transition={{ type: "tween" }}
            >
              <Btn>시작하기</Btn>
            </Start>
          </TextBox>
        </Content>
      </VideoBox>
    </Box>
  );
};
