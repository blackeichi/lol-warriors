import React from "react";
import { useRecoilState } from "recoil";
import { startState } from "../util/atom";
import {
  Btn,
  Content,
  Line,
  Logo,
  Overlay,
  OverVideo,
  Start,
  TextBox,
  Video,
  VideoBox,
} from "../util/componentStyle";

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

export const HomeVideo = () => {
  const [started, setStarted] = useRecoilState(startState);
  return (
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
  );
};
