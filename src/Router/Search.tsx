import styled from "styled-components";
import { LangSelect } from "../Components/LangSelect";
import { InputForm } from "../Components/InputForm";
import { TitleCompo } from "../Components/TitleCompo";

const HomeBox = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: ${(props) => props.theme.bgColr};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15vh;
  box-sizing: border-box;
`;

export const Search = () => {
  return (
    <HomeBox>
      <TitleCompo home={true} />
      <InputForm home={true} />
      <LangSelect home={true} />
    </HomeBox>
  );
};
