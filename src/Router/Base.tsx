import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import "../util/index.css";
import { useRecoilState } from "recoil";
import { pageState } from "../util/atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faArrowUp19,
} from "@fortawesome/free-solid-svg-icons";
import { homeData } from "../util/data";

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  background-color: black;
`;
const RemoCon = styled.div`
  width: 100px;
  height: 100px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 30px;
  font-weight: 700;
  z-index: 3;
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
  height: 80%;
  overflow: hidden;
  position: absolute;
  top: 0;
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

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 1700;
`;
const HomeBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  overflow: hidden;
`;
const TopBlock = styled.div`
  position: absolute;
  top: 0;
  z-index: 5;
  width: 100%;
  background-color: black;
  height: 20vw;
  max-height: 100px;
`;

const BotBlock = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 2;
  width: 100%;
  background-color: black;
  height: 20vw;
  max-height: 100px;
`;
const startVariant = {
  onStart: {
    y: 0,
    display: "flex",
  },
  onEnd: {
    y: -1700,
    transition: {
      duration: 2,
    },
    transitionEnd: {
      display: "none",
    },
  },
};
const boxMove = {
  enter: (isNext: number) => {
    return {
      top: isNext > 0 ? 1700 : -1700,
    };
  },
  center: {
    zIndex: 1,
    top: 0,
    display: "flex",
  },
  exit: (isNext: number) => {
    return {
      top: isNext > 0 ? -1700 : 1700,
    };
  },
};

export const Base = () => {
  const [started, setStarted] = useState(false);
  const [pages, setPage] = useRecoilState(pageState);
  const [isNext, setIsNext] = useState(1);
  const onUp = () => {
    setPage((prev) => prev - 1);
    setIsNext(-1);
  };
  const onDown = () => {
    setPage((prev) => prev + 1);
    setIsNext(1);
  };
  return (
    <Box>
      <VideoBox variants={startVariant} animate={started ? "onEnd" : "onStart"}>
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
      {started && (
        <AnimatePresence custom={isNext}>
          <HomeBox
            key={pages}
            variants={boxMove}
            custom={isNext}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 2 }}
          >
            <TopBlock />
            <ReactPlayer
              url={homeData[pages].url}
              width="100%"
              height="100%"
              volume={0.1}
              playing={true}
              loop={true}
              controls={false}
              style={{ maxHeight: "90vh", pointerEvents: "none" }}
            />
            <BotBlock />
          </HomeBox>
        </AnimatePresence>
      )}

      {started && (
        <RemoCon>
          {pages !== 0 && (
            <FontAwesomeIcon
              onClick={onUp}
              style={{ cursor: "pointer" }}
              color="white"
              icon={faArrowUp}
            />
          )}
          {pages !== 4 && (
            <FontAwesomeIcon
              onClick={onDown}
              style={{ cursor: "pointer" }}
              color="white"
              icon={faArrowDown}
            />
          )}
        </RemoCon>
      )}
    </Box>
  );
};
