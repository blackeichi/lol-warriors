import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import "../util/index.css";
import { useRecoilState } from "recoil";
import { pageState } from "../util/atom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { homeData } from "../util/data";
import {
  BotBlock,
  Box,
  Btn,
  Content,
  ContentBox,
  ContentTitle,
  HomeBox,
  Line,
  Logo,
  Overlay,
  OverVideo,
  RemoCon,
  Start,
  TextBox,
  TopBlock,
  Video,
  VideoBox,
} from "../util/componentStyle";
import { useForm } from "react-hook-form";

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
  const { register, handleSubmit } = useForm();
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
  const [username, setUsername] = useState("");
  const onValid = (data: any) => {
    setUsername(data.username);
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
            <div style={{ position: "relative" }}>
              <ReactPlayer
                url={homeData[pages].url}
                width="100vw"
                height="100vh"
                volume={0.1}
                playing={true}
                loop={true}
                controls={false}
                style={{
                  maxHeight: "90vh",
                  pointerEvents: "none",
                  maxWidth: "1500px",
                }}
              />
              <ContentBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 6 }}
              >
                <ContentTitle>{homeData[pages].title}</ContentTitle>
                {homeData[pages].input && (
                  <form onSubmit={handleSubmit(onValid)}>
                    <input
                      {...register("username", {
                        required: "Username is required",
                      })}
                      type="text"
                    />
                  </form>
                )}
              </ContentBox>
            </div>
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
