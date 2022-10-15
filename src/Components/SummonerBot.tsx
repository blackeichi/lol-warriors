import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getMastery, getMatchs, IChamp, userInterface } from "../util/api";
import { resizeState, searchRange, serverState, wins } from "../util/atom";
import { Match } from "./Map/Match";
import { Piechart } from "./Piechart";
import { Mastery } from "./Map/Mastery";

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
  userData: userInterface;
  username: string;
};

export const SummonerBot: React.FC<Ipuuid> = ({ userData, username }) => {
  const size = useRecoilValue(resizeState);
  const server = useRecoilValue(serverState);
  const win = useRecoilValue(wins);
  const winNum = win.length;
  const { t } = useTranslation();
  const Range = useRecoilValue(searchRange);
  const { data: matchData } = useQuery(["matchData"], () =>
    getMatchs(userData.puuid, Range)
  );
  const { data: masteryData } = useQuery(["masteryData"], () =>
    getMastery(server, userData.id)
  );
  return (
    <Box size={size}>
      <Left size={size}>
        <KDA>
          {Range +
            t("games") +
            " " +
            winNum +
            t("wins") +
            " " +
            (Range - winNum) +
            t("losses")}
        </KDA>
        <Piechart win={winNum} defeat={Range - winNum} />
        {masteryData?.map((data: IChamp) => (
          <Mastery key={data.championId} Champ={data} />
        ))}
      </Left>
      <Right size={size}>
        {matchData?.map((data: string) => (
          <Match key={data} data={data} username={username} />
        ))}
      </Right>
    </Box>
  );
};
