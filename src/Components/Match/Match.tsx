import React, { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getGames, getRune, getSpell, IMatch } from "../../util/api";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCoins } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState, useSetRecoilState } from "recoil";
import { wins } from "../../util/atom";

const Container = styled.div`
  display: flex;
  font-family: "MonoplexKR-Regular";
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
  justify-content: space-between;
`;
const LeftBox = styled.div`
  display: flex;
`;

const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 120px;
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
  gap: 5px;
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
const ColBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const Spell = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 5px;
`;
const Rune = styled.img`
  width: 25px;
  height: 25px;
`;
const KDABox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const RowBox = styled.div`
  display: flex;
  gap: 8px;
`;
const SpaceBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const KDA = styled.div`
  font-weight: bold;
  font-size: 20px;
`;
const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const Items = styled.div``;
const Item = styled.img`
  background-color: black;
  width: 30px;
  height: 30px;
`;
const AceH1 = styled.h1`
  font-size: 14px;
  background-color: ${(props) => props.theme.redColr};
  color: white;
  padding: 7px;
  border-radius: 20px;
`;
const ArrowBox = styled.div<{ win: boolean }>`
  background-color: ${(props) =>
    props.win ? props.theme.darkBlue : props.theme.darkRed};
  display: flex;
  align-items: flex-end;
  padding: 20px 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  color: ${(props) => (props.win ? "blue" : "red")};
`;

type Idata = {
  data: string;
  username: string;
};
type Ique = {
  [index: number]: string;
};
type IPosi = {
  [index: string]: string;
};
const queType: Ique = {
  400: t("norm"),
  420: t("solo"),
  430: t("norm"),
  440: t("flex"),
  450: t("aram"),
  1900: "Event Game",
};
const positionType: IPosi = {
  BOTTOM: t("bot"),
  UTILITY: t("sup"),
  Invalid: t("Invalid"),
  TOP: t("top"),
  JUNGLE: t("jung"),
  MIDDLE: t("mid"),
};

export const Match: React.FC<Idata> = ({ data, username }) => {
  const { t } = useTranslation();
  const [win, setWins] = useRecoilState(wins);
  const { data: gameData } = useQuery([data], () => getGames(data));
  const { data: spellData } = useQuery(["spellData"], getSpell);
  const { data: runeData } = useQuery(["runeData"], getRune);
  const Me: IMatch = gameData?.info.participants.find(
    (user: any) => user.summonerName === username
  );
  //-----getDate
  const date = new Date(gameData?.info.gameCreation);
  const today = new Date();
  let days = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60));
  let daysW = t("hourago");
  if (days > 24) {
    days = Math.floor(
      (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    daysW = t("daysago");
  }
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
  let Ace = "";
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
  //-----set P/win
  useEffect(() => {
    if (Me?.win) {
      setWins(win + 1);
    }
  }, [Me?.win]);

  return (
    <>
      {Me && (
        <Container>
          <Overlay win={Me.win} />
          <Box win={Me.win}>
            <LeftBox>
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
                <ColBox>
                  <Spell
                    src={`https://ddragon.leagueoflegends.com/cdn/12.19.1/img/spell/${spell1?.[0]}.png`}
                  />
                  <Spell
                    src={`https://ddragon.leagueoflegends.com/cdn/12.19.1/img/spell/${spell2?.[0]}.png`}
                  />
                </ColBox>
                <ColBox>
                  <Rune
                    style={{ backgroundColor: "black", borderRadius: "50%" }}
                    src={`https://ddragon.leagueoflegends.com/cdn/img/${Rune1?.icon}`}
                  />
                  <Rune
                    src={`https://ddragon.leagueoflegends.com/cdn/img/${Rune2?.icon}`}
                  />
                </ColBox>
              </ChampInfo>
            </LeftBox>
            <KDABox>
              <RowBox>
                <KDA>{Me?.kills}</KDA>
                <KDA>/</KDA>
                <KDA style={{ color: "red" }}>{Me?.deaths}</KDA>
                <KDA>/</KDA>
                <KDA>{Me?.assists} </KDA>
              </RowBox>
              <RowBox>
                <BoldData>
                  {Me?.challenges?.kda && t("kda") + " "}
                  {Me?.challenges?.kda.toFixed(2) + ":1 "}
                </BoldData>
                <BoldData style={{ color: "#9055A2" }}>
                  {t("Kill") + " " + Math.floor(myKillRate)}%
                </BoldData>
              </RowBox>
              <RowBox>
                {Ace && <AceH1>{Ace}</AceH1>}
                {Me.firstBloodKill && <AceH1>FK</AceH1>}
                {Me.firstTowerKill && <AceH1>FTK</AceH1>}
              </RowBox>
            </KDABox>
            <ItemBox>
              <Items>
                {items?.map((item) => (
                  <>
                    {item ? (
                      <Item
                        key={item}
                        src={`https://ddragon.leagueoflegends.com/cdn/12.19.1/img/item/${item}.png`}
                      />
                    ) : (
                      <Item />
                    )}
                  </>
                ))}
              </Items>
              <SpaceBox>
                <Data>
                  CS {Me?.totalMinionsKilled} (
                  {(Me?.totalMinionsKilled / time).toFixed(1)})
                </Data>
                <BoldData>
                  <FontAwesomeIcon icon={faCoins} /> {Me.goldEarned}
                </BoldData>
              </SpaceBox>
              <ColBox style={{ gap: "2px" }}>
                <Data>
                  {t("position") + ": " + positionType[Me?.individualPosition]}
                </Data>
                <Data>
                  {t("visionScore") + ": " + Math.floor(Me.visionScore)}
                </Data>
                <Data>{"CC: " + Me?.timeCCingOthers + t("second")}</Data>
              </ColBox>
            </ItemBox>
          </Box>
          <ArrowBox win={Me.win}>
            <FontAwesomeIcon icon={faAngleDown} />
          </ArrowBox>
        </Container>
      )}
    </>
  );
};
