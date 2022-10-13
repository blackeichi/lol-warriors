import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { InputForm } from "../Components/InputForm";
import { LangSelect } from "../Components/LangSelect";
import { TitleCompo } from "../Components/TitleCompo";
import { getPuuid, userInterface } from "../util/api";
import { resizeState, serverState } from "../util/atom";
import { SummonerTop } from "../Components/SummonerTop";
import { SummonerBot } from "../Components/SummonerBot";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const Header = styled.div<{ size: string }>`
  background-color: ${(props) => props.theme.bgColr};
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.size !== "Mobile" ? "row" : "column")};
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Box = styled.div`
  display: flex;
`;

let getUser: any[] = [];

export const Summoner = () => {
  const size = useRecoilValue(resizeState);
  const server = useRecoilValue(serverState);
  const location = useLocation();
  const username = new URLSearchParams(location.search).get(
    "username"
  ) as string;
  const { data: userData, refetch } = useQuery<userInterface>(
    ["userData"],
    () => getPuuid(server, username)
  );
  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser !== null) {
      getUser = JSON.parse(savedUser);
    }
    if (userData !== undefined) {
      const newObject = {
        username,
        server,
      };
      const exist = getUser.find(
        (element) => element.username === newObject.username
      );
      if (exist) {
        return;
      }
      getUser.push(newObject);
      localStorage.setItem("username", JSON.stringify(getUser));
    }
  });
  useEffect(() => {
    refetch();
  }, [refetch, username]);
  return (
    <Container>
      <Header size={size}>
        <TitleCompo />
        <Box>
          <InputForm />
          <LangSelect size={size} home={false} />
        </Box>
      </Header>
      {userData ? (
        <>
          <SummonerTop userData={userData} />
          <SummonerBot puuid={userData?.puuid} username={username} />
        </>
      ) : (
        <h1>Loading..</h1>
      )}
    </Container>
  );
};