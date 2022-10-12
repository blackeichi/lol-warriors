import React, { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getGames, getRune, getSpell, IMatch } from "../../util/api";
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
const ChampInfo = styled.div`
  display: flex;
  align-items: center;
`;
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
const SpellBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const Spell = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 5px;
`;
const RuneBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const Rune = styled.img`
  width: 30px;
  height: 30px;
`;
const KDABox = styled.div``;
const KDATotal = styled.div``;
const KDA = styled.div``;
const ItemBox = styled.div``;
const Items = styled.div``;
const Item = styled.img``;
const AceH1 = styled.h1``;

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
  1900: "Event Game",
};

export const Match: React.FC<Idata> = ({ data, username }) => {
  const { t } = useTranslation();
  const { data: gameData, refetch } = useQuery([data], () => getGames(data));
  const { data: spellData } = useQuery(["spellData"], getSpell);
  const { data: runeData } = useQuery(["runeData"], getRune);
  const Me: IMatch = gameData?.info.participants.find(
    (user: any) => user.summonerName === username
  );
  //-----getDate
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
  //-----getTime
  const time = Math.floor(gameData?.info.gameDuration / 60);
  //-----getSpell
  let spell1;
  let spell2;
  if (spellData) {
    spell1 = Object.entries(spellData.data).find(
      (da: any) => da[1].key === String(Me?.summoner1Id)
    );
    spell2 = Object.entries(spellData.data).find(
      (da: any) => da[1].key === String(Me?.summoner2Id)
    );
  }
  //-----getRune
  let Rune1;
  let Rune2;
  if (runeData) {
    const Primar = runeData?.find(
      (da: any) => da.id === Me?.perks.styles[0].style
    );
    Rune1 = Primar?.slots[0].runes.find(
      (da: any) => da.id === Me?.perks.styles[0].selections[0].perk
    );
    Rune2 = runeData?.find((da: any) => da.id === Me?.perks.styles[1].style);
  }
  //-----getMyteamScore
  const Myteam = gameData?.info.teams.find((da: any) => da.win === Me?.win);
  const myKillRate =
    ((Me?.kills + Me?.assists) / Myteam?.objectives?.champion?.kills) * 100;
  //-----getAce
  let Ace;
  if (Me?.pentaKills > 0) {
    Ace = "펜타킬";
  } else if (Me?.quadraKills > 0) {
    Ace = "쿼드라킬";
  } else if (Me?.tripleKills > 0) {
    Ace = "트리플킬";
  } else if (Me?.doubleKills > 0) {
    Ace = "더블킬";
  }
  //-----getItem
  let items;
  if (Me) {
    items = [
      Me.item0,
      Me.item1,
      Me.item2,
      Me.item3,
      Me.item4,
      Me.item5,
      Me.item6,
    ];
  }

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
                  src={`https://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${Me.championName}.png`}
                />
                <Level>{Me.champLevel}</Level>
              </ChampBox>
              <SpellBox>
                <Spell
                  src={`https://ddragon.leagueoflegends.com/cdn/12.19.1/img/spell/${spell1?.[0]}.png`}
                />
                <Spell
                  src={`https://ddragon.leagueoflegends.com/cdn/12.19.1/img/spell/${spell2?.[0]}.png`}
                />
              </SpellBox>
              <RuneBox>
                <Rune
                  style={{ backgroundColor: "black", borderRadius: "50%" }}
                  src={`https://ddragon.leagueoflegends.com/cdn/img/${Rune1?.icon}`}
                />
                <Rune
                  src={`https://ddragon.leagueoflegends.com/cdn/img/${Rune2?.icon}`}
                />
              </RuneBox>
            </ChampInfo>
            <KDABox>
              <KDATotal>
                <KDA>{Me?.kills}</KDA>
                <KDA>{Me?.deaths}</KDA>
                <KDA>{Me?.assists}</KDA>
              </KDATotal>
              <BoldData>{Me?.challenges?.kda.toFixed(1)}</BoldData>
              <BoldData></BoldData>
            </KDABox>
            <ItemBox>
              <Items>
                {items?.map((item) => (
                  <Item
                    src={`https://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${item}.png`}
                  />
                ))}
              </Items>
              <BoldData>
                CS : {Me?.totalMinionsKilled} (
                {(Me?.totalMinionsKilled / time).toFixed(1)})
              </BoldData>
              <BoldData>킬관여 : {Math.floor(myKillRate)}%</BoldData>
              <BoldData>시야점수 : {Math.floor(Me.visionScore)}</BoldData>
              <BoldData>Gold : {Me.goldEarned}</BoldData>
              <BoldData>{Me.firstBloodKill && "First Kill"}</BoldData>
              <BoldData>{Me.firstTowerKill && "First Tower Kill"}</BoldData>
              <BoldData>
                {Me?.individualPosition !== "Invalid" && Me?.individualPosition}
              </BoldData>
              <BoldData>{Me?.tripleKills}</BoldData>
              <AceH1>{Ace}</AceH1>
            </ItemBox>
          </Box>
        </Container>
      )}
    </>
  );
};
