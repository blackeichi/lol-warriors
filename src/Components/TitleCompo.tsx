import { resizeState } from "../util/atom";
import ReactPlayer from "react-player";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImgBox = styled.div<{ home: boolean }>`
  width: 270px;
  height: 150px;
  display: ${(props) => (props.home ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  pointer-events: none;
  border-radius: 55px;
  overflow: hidden;
  position: relative;
  margin-bottom: ${(props) => (props.home ? "15px" : "0")};
`;
const Overlay = styled.div`
  position: absolute;
  width: 90%;
  height: 84%;
  border-radius: 50px;
  border: 8px solid ${(props) => props.theme.bgColr};
`;
const TitleBox = styled.div<{ size: string; home: boolean }>`
  display: flex;
  gap: 5px;
  align-items: center;
  margin-bottom: ${(props) =>
    props.home ? "40px" : props.size !== "Mobile" ? "0" : "10px"};
`;
const Title = styled.h1<{ size: string; home: boolean }>`
  font-family: "HBIOS-SYS";
  color: white;
  font-size: ${(props) =>
    props.size !== "Mobile" && props.size !== "Small"
      ? props.home
        ? "70px"
        : "40px"
      : props.home
      ? "14vw"
      : "12vw"};

  cursor: pointer;
`;
const TitleImg = styled.img<{ size: string; home: boolean }>`
  width: ${(props) =>
    props.size !== "Mobile" && props.size !== "Small"
      ? props.home
        ? "70px"
        : "40px"
      : props.home
      ? "14vw"
      : "12vw"};
`;

type Interface = {
  home?: boolean;
};

export const TitleCompo: React.FC<Interface> = ({ home = false }) => {
  const size = useRecoilValue(resizeState);
  const navigate = useNavigate();
  return (
    <Box>
      <ImgBox home={home}>
        <Overlay />
        <ReactPlayer
          url={"https://www.youtube.com/watch?v=FmDPQ6D42HI&t=1s"}
          width="400px"
          height="300px"
          loop={true}
          playing={true}
          muted={true}
          controls={false}
          volume={0.1}
        />
      </ImgBox>
      <TitleBox home={home} size={size}>
        <TitleImg
          home={home}
          size={size}
          src="https://opgg-gnb.akamaized.net/static/images/icons/img-navi-lol-white.svg?image=q_auto,f_webp,w_48&v=1666160193533"
        />
        <Title onClick={() => navigate(`/`)} home={home} size={size}>
          Warriors
        </Title>
      </TitleBox>
    </Box>
  );
};
