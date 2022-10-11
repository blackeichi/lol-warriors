import React, { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getGames, getSpell, IMatch } from "../../util/api";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const Container = styled.div`
  display: flex;
`;

const Overlay = styled.div<{ win: boolean }>`
  width: 10px;
  height: 120px;
  background-color: ${(props) =>
    props.win ? props.theme.blueColr : props.theme.redColr};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const Box = styled.div<{ win: boolean }>`
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  background-color: ${(props) => (props.win ? "#ECF2FF" : "#FFF1F3")};
  display: flex;
  align-items: center;
  padding: 10px;
`;

const GameInfo = styled.div`
  font-family: "MonoplexKR-Regular";
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Gamemode = styled.h1<{ win: boolean }>`
  color: ${(props) => (props.win ? props.theme.blueColr : props.theme.redColr)};
  font-size: 15px;
  font-weight: bold;
`;
const Data = styled.h1`
  color: darkgray;
  font-size: 13px;
`;
const BoldData = styled.h1`
  color: ${(props) => props.theme.darkGray};
  font-size: 13px;
  font-weight: bold;
`;
const ChampInfo = styled.div``;
const ChampBox = styled.div`
  position: relative;
`;
const Champ = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
const Level = styled.h1`
  position: absolute;
  right: -3px;
  bottom: 3px;
  color: white;
  background-color: black;
  padding: 5px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
`;
const SpellBox = styled.div``;
const Spell = styled.img``;
const RoonBox = styled.div``;
const Roon = styled.img``;
type Idata = {
  data: string;
  username: string;
};
type Ique = {
  [index: number]: string;
};
const queType: Ique = {
  400: t("norm"),
  420: t("solo"),
  430: t("norm"),
  440: t("flex"),
  450: t("aram"),
};

export const Match: React.FC<Idata> = ({ data, username }) => {
  const { t } = useTranslation();
  const { data: gameData, refetch } = useQuery([data], () => getGames(data));
  const { data: spellData } = useQuery(["spellData"], getSpell);

  const Me: IMatch = gameData?.info.participants.find(
    (user: any) => user.summonerName === username
  );
  const date = new Date(gameData?.info.gameCreation);
  const today = new Date();
  let days = Math.floor(
    (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  let daysW = t("daysago");
  if (days > 30) {
    days = Math.floor(
      (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );
    daysW = t("montsago");
  }
  const time = Math.floor(gameData?.info.gameDuration / 60);
  const spell = Object.entries(spellData?.data);
  const test = spell.find((da: any) => da[1].key === String(Me?.summoner1Id));
  console.log(test?.[0]);
  return (
    <>
      {Me && (
        <Container>
          <Overlay win={Me.win} />
          <Box win={Me.win}>
            <GameInfo>
              <Gamemode win={Me.win}>
                {queType[gameData?.info.queueId]}
              </Gamemode>
              <Data>
                {days}
                {daysW}
              </Data>
              <BoldData>{Me.win ? t("victory") : t("defeat")}</BoldData>
              <Data>
                {time + t("minute")}&nbsp;
                {Math.floor(gameData?.info.gameDuration - time * 60) +
                  t("second")}
              </Data>
            </GameInfo>
            <ChampInfo>
              <ChampBox>
                <Champ
                  id={data}
                  src={`https://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/${Me.championName}.png`}
                />
                <Level>{Me.champLevel}</Level>
              </ChampBox>
              <Data>{Me.summoner1Id}</Data>
              <Data>{Me.summoner2Id}</Data>
              <SpellBox>
                <Spell
                  src={`https://ddragon.leagueoflegends.com/cdn/10.6.1/img/spell/${test?.[0]}.png`}
                />
                <Spell />
              </SpellBox>
              <RoonBox>
                <Roon />
                <Roon />
              </RoonBox>
            </ChampInfo>
          </Box>
        </Container>
      )}
    </>
  );
};
