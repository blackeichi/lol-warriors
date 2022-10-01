import { motion } from "framer-motion";
import styled from "styled-components";

export const Box = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  background-color: black;
`;
export const RemoCon = styled.div`
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

export const VideoBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Overlay = styled.div`
  width: 100%;
  height: 80%;
  overflow: hidden;
  position: absolute;
  top: 0;
`;
export const OverVideo = styled.video`
  width: 100%;
  left: 0;
  filter: blur(15px);
  scale: 1.1;
`;
export const Content = styled.div`
  width: 95%;
  max-width: 1300px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
export const Line = styled.div`
  position: absolute;
  width: 97%;
  height: 105%;
  border: 3px solid gray;
  z-index: 2;
  border-radius: 0 0 0;
`;
export const Video = styled.video`
  width: 100%;
`;
export const TextBox = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
export const Logo = styled.img`
  width: 40vw;
`;
export const Start = styled(motion.div)`
  border: 2px solid white;
  padding: 5px;
  cursor: pointer;
`;
export const Btn = styled(motion.h1)`
  background-color: ${(props) => props.theme.blueColr};
  padding: 15px 70px;
  font-size: 14px;
  font-family: "MonoplexKR-Regular";
`;

export const HomeBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
export const TopBlock = styled.div`
  position: absolute;
  top: 0;
  z-index: 5;
  width: 100%;
  background-color: black;
  height: 15vh;
`;
export const ContentBox = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "MonoplexKR-Regular";
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
`;
export const ContentTitle = styled.h1`
  color: white;
  font-size: 20px;
  font-weight: 700;
`;
export const ContentInput = styled.input`
  outline: none;
  box-sizing: border-box;
  padding: 5px 10px;
  margin-top: 20px;
`;
export const BotBlock = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 2;
  width: 100%;
  background-color: black;
  height: 15vh;
`;
