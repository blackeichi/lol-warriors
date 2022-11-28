import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  getChap,
  getMastery,
  getMatchs,
  IChamp,
  userInterface,
} from "../util/api";
import {
  defeats,
  KDAstate,
  resizeState,
  searchRange,
  serverState,
  wins,
} from "../util/atom";
import { Match } from "./Map/Match";
import { Piechart } from "./Piechart";
import { Mastery } from "./Map/Mastery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { RecentKDA } from "./Map/RecentKDA";
import { useLocation } from "react-router-dom";

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
const Title = styled(KDA)`
  font-weight: bold;
  color: ${(props) => props.theme.bgColr};
  font-size: 18px;
  margin-top: 30px;
`;
const Right = styled.div<{ size: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const MoreBtn = styled(motion.div)`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid darkgray;
  margin-top: 10px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 30px;
  font-weight: bold;
  box-sizing: border-box;
  color: darkgray;
`;
const Erbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type Ipuuid = {
  userData: userInterface;
};

export const SummonerBot: React.FC<Ipuuid> = ({ userData }) => {
  const size = useRecoilValue(resizeState);
  const server = useRecoilValue(serverState);
  const win = useRecoilValue(wins);
  const defeat = useRecoilValue(defeats);
  const defeatNum = defeat.length;
  const winNum = win.length;
  const { t } = useTranslation();
  const [Range, setRange] = useRecoilState(searchRange);
  const { data: matchData, refetch } = useQuery(["matchData"], () =>
    getMatchs(userData.puuid, Range)
  );
  const { data: masteryData, refetch: masteryRe } = useQuery(
    ["masteryData"],
    () => getMastery(server, userData.id)
  );
  const { data: ChampData, refetch: champRe } = useQuery(
    ["ChampData"],
    getChap
  );
  const handlePage = async () => {
    await setRange(Range + 20);
    refetch();
  };
  const KDAdata = useRecoilValue(KDAstate);
  const recentChamp = KDAdata.reduce(
    (prev: any, current: any) =>
      prev.includes(current.championName)
        ? prev
        : [...prev, current.championName],
    []
  );
  useEffect(() => {
    refetch();
    masteryRe();
    champRe();
  }, [champRe, masteryRe, refetch, userData]);
  return (
    <Box size={size}>
      <Left size={size}>
        <KDA>
          {defeatNum +
            winNum +
            t("games") +
            " " +
            winNum +
            t("wins") +
            " " +
            defeatNum +
            t("losses")}
        </KDA>
        <Piechart win={winNum} defeat={defeatNum} />
        <Title>{userData.name}님의 숙련도</Title>
        {masteryData?.map((data: IChamp, index: any) => (
          <Mastery key={index} data={ChampData} Champ={data} />
        ))}
        <Title>최근 {Range}게임 챔프별 KDA</Title>
        {recentChamp.map((champ: any, index: any) => (
          <RecentKDA key={index} KDAdata={KDAdata} champ={champ} />
        ))}
      </Left>
      <Right size={size}>
        {matchData ? (
          <>
            {matchData?.map((data: string) => (
              <Match key={data} data={data} username={userData.name} />
            ))}
            <MoreBtn onClick={handlePage} whileHover={{ fontSize: "40px" }}>
              <FontAwesomeIcon icon={faCaretDown} />
            </MoreBtn>
          </>
        ) : (
          <Erbox>
            <Title>현재 데이터 사용량이 너무 많습니다.</Title>
            <Title>1~2분 후 다시 이용해주세요.😉</Title>
          </Erbox>
        )}
      </Right>
    </Box>
  );
};
