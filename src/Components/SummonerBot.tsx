import React from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getMatchs } from "../util/api";
import { defeats, resizeState, searchRange, wins } from "../util/atom";
import { Match } from "./Match/Match";
import { Piechart } from "./Piechart";

const Box = styled.div<{ size: string }>`
  width: ${(props) => (props.size !== "Web" ? "95vw" : "98%")};
  max-width: 980px;
  background-color: ${(props) => props.theme.grayColr};
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  gap: 1%;
  padding: 40px 0;
`;
const Left = styled.div<{ size: string }>`
  width: ${(props) => props.size === "Web" && "40%"};
  display: ${(props) => (props.size === "Web" ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  font-family: "MonoplexKR-Regular";
  gap: 25px;
`;
const KDA = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;
const Right = styled.div<{ size: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

type Ipuuid = {
  puuid: string;
  username: string;
};

export const SummonerBot: React.FC<Ipuuid> = ({ puuid, username }) => {
  const size = useRecoilValue(resizeState);
  const win = useRecoilValue(wins);
  const defeat = useRecoilValue(defeats);
  const Range = useRecoilValue(searchRange);
  const { data: matchData } = useQuery(["matchData"], () =>
    getMatchs(puuid, Range)
  );
  return (
    <Box size={size}>
      <Left size={size}>
        <KDA>{win + defeat + "전 " + win + "승 " + defeat + "패"}</KDA>
        <Piechart win={win} defeat={defeat} />
      </Left>
      <Right size={size}>
        {matchData?.map((data: string) => (
          <Match key={data} data={data} username={username} />
        ))}
      </Right>
    </Box>
  );
};
