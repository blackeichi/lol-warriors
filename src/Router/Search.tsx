import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { resizeState } from "../util/atom";

const HomeBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.bgColr};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  font-family: "HBIOS-SYS";
  color: white;
  font-size: 20px;
`;
const ContentInput = styled.input`
  outline: none;
  box-sizing: border-box;
  padding: 5px 10px;
  margin-top: 20px;
  border: none;
  ::placeholder {
  }
`;

export const Search = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onValid = (data: any) => {
    navigate(`/summoner/?username=${data.username}`);
  };
  const [screen, setScreen] = useState(window.outerWidth);
  const [large, setLarge] = useRecoilState(resizeState);
  useEffect(() => {
    const handleResize = () => {
      setScreen(window.outerWidth);
    };
    window.addEventListener("resize", handleResize);
    if (screen > 550) {
      setLarge(true);
    } else if (screen <= 550) {
      setLarge(false);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <HomeBox>
      <Title>LoL-Warriors</Title>
      <form
        style={{ boxSizing: "border-box" }}
        onSubmit={handleSubmit(onValid)}
      >
        <ContentInput
          {...register("username", {
            required: "Username is required",
          })}
          autoComplete="off"
          type="text"
          placeholder="소환사명..."
        />
      </form>
    </HomeBox>
  );
};
