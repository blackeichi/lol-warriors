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
const Title = styled.h1<{ size: string; home: boolean }>`
  font-family: "HBIOS-SYS";
  color: white;
  font-size: ${(props) =>
    props.size !== "Mobile"
      ? props.home
        ? "70px"
        : "40px"
      : props.home
      ? "12vw"
      : "10vw"};
  margin-bottom: ${(props) =>
    props.home ? "40px" : props.size !== "Mobile" ? "0" : "10px"};
  cursor: pointer;
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
      <Title onClick={() => navigate(`/`)} home={home} size={size}>
        LoL Warriors
      </Title>
    </Box>
  );
};
