import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getGames, getRune, getSpell, IMatch } from "../../util/api";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { defeats, KDAstate, resizeState, wins } from "../../util/atom";
import { OpenMatch } from "../Map/OpenMatch";

const Wrapper = styled.div`
  margin-bottom: 10px;
`;

const Container = styled.div`
  display: flex;
  font-family: "MonoplexKR-Regular";
`;

const Overlay = styled.div<{ win: boolean; open?: boolean }>`
  width: 10px;
  height: 120px;
  background-color: ${(props) =>
    props.win ? props.theme.blueColr : props.theme.redColr};
  border-top-left-radius: 10px;
  border-bottom-left-radius: ${(props) => (props.open ? "" : "10px")};
`;

const Box = styled.div<{ win: boolean }>`
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.win ? props.theme.blueBg : props.theme.redBg};
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  position: relative;
`;
const LeftBox = styled.div<{ size: string }>`
  display: flex;
  flex-direction: ${(props) => (props.size === "Small" ? "column" : "row")};
  gap: ${(props) => (props.size === "Small" ? "2px" : "")};
`;

const GameInfo = styled.div<{ size: string }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: ${(props) => (props.size === "Small" ? "" : "120px")};
  top: 5px;
  left: 5px;
`;
const Gamemode = styled.h1<{ win: boolean; size: string }>`
  color: ${(props) => (props.win ? props.theme.blueColr : props.theme.redColr)};
  font-size: ${(props) => (props.size === "Small" ? "3.5vw" : "15px")};
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
const Champ = styled.img<{ size: string }>`
  width: ${(props) =>
    props.size === "Mobile"
      ? "10vw"
      : props.size === "Small"
      ? "12vw"
      : "60px"};
  height: ${(props) =>
    props.size === "Mobile"
      ? "10vw"
      : props.size === "Small"
      ? "12vw"
      : "60px"};
  border-radius: 50%;
`;
const Level = styled.h1<{ size: string }>`
  position: absolute;
  right: -5px;
  bottom: 0px;
  color: white;
  background-color: black;
  padding: 5px;
  border-radius: 50%;
  font-size: ${(props) => (props.size === "Mobile" ? "8px" : "12px")};
  font-weight: bold;
`;
const ColBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const Spell = styled.img<{ size: string }>`
  width: ${(props) =>
    props.size === "Mobile"
      ? "5vw"
      : props.size === "Small"
      ? "3.7vh"
      : "30px"};
  height: ${(props) =>
    props.size === "Mobile"
      ? "5vw"
      : props.size === "Small"
      ? "3.7vh"
      : "30px"};
  border-radius: 5px;
`;
const Rune = styled.img<{ size: string }>`
  width: ${(props) =>
    props.size === "Mobile"
      ? "5vw"
      : props.size === "Small"
      ? "3.7vh"
      : "30px"};
  height: ${(props) =>
    props.size === "Mobile"
      ? "5vw"
      : props.size === "Small"
      ? "3.7vh"
      : "30px"};
`;
const KDABox = styled.div<{ size: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: ${(props) => (props.size === "Small" ? "4vw" : "20px")};
`;
const RowBox = styled.div`
  display: flex;
  gap: 8px;
`;
const KDA = styled.div`
  font-weight: bold;
`;
const ItemBox = styled.div<{ size: string }>`
  display: ${(props) => (props.size === "Small" ? "none" : "flex")};
  flex-direction: column;
  justify-content: flex-end;
`;
const Items = styled.div<{ size: string }>`
  display: ${(props) => (props.size === "Mobile" ? "none" : "flex")};
  flex-direction: row;
`;
const Item = styled.img`
  background-color: black;
  width: 30px;
  height: 30px;
`;
const AceH1 = styled.h1<{ size: string }>`
  font-size: ${(props) => (props.size === "Small" ? "2vh" : "14px")};
  background-color: ${(props) => props.theme.redColr};
  color: white;
  padding: 7px;
  border-radius: 20px;
`;
const ArrowBox = styled.div<{ win: boolean; open?: boolean }>`
  background-color: ${(props) =>
    props.win ? props.theme.darkBlue : props.theme.darkRed};
  display: flex;
  align-items: flex-end;
  padding: 20px 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: ${(props) => (props.open ? "" : "10px")};
  cursor: pointer;
  color: ${(props) => (props.win ? "blue" : "red")};
`;

type Idata = {
  data: string;
  username: string;
};
type IPosi = {
  [index: string]: string;
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
  const { data: gameData } = useQuery([data], () => getGames(data));
  const { data: spellData } = useQuery(["spellData"], getSpell);
  const { data: runeData } = useQuery(["runeData"], getRune);
  const Me: IMatch = gameData?.info.participants.find(
    (user: any) => user.summonerName === username
  );
  const size = useRecoilValue(resizeState);
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
    Ace = "Penta";
  } else if (Me?.quadraKills > 0) {
    Ace = "Quadra";
  } else if (Me?.tripleKills > 0) {
    Ace = "Tripple";
  } else if (Me?.doubleKills > 0) {
    Ace = "Double";
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
  let gameId: number = gameData?.info.gameId;
  const [win, setWins] = useRecoilState(wins);
  const [defeat, setdefeats] = useRecoilState(defeats);
  useEffect(() => {
    //-----set P/win
    if (gameId !== undefined) {
      if (Me?.win) {
        if (win.includes(gameId)) {
        } else {
          setWins([...win, gameId]);
        }
      } else {
        if (defeat.includes(gameId)) {
        } else {
          setdefeats([...defeat, gameId]);
        }
      }
    }
  });
  //-----getGametype
  let gameMode;
  if (gameData?.info.queueId === 400) {
    gameMode = t("norm");
  } else if (gameData?.info.queueId === 420) {
    gameMode = t("solo");
  } else if (gameData?.info.queueId === 430) {
    gameMode = t("norm");
  } else if (gameData?.info.queueId === 440) {
    gameMode = t("flex");
  } else if (gameData?.info.queueId === 450) {
    gameMode = t("aram");
  } else {
    gameMode = "Event";
  }
  const [open, setOpen] = useState(false);
  //---set KDA Data
  const [KDAdata, setKDAdata] = useRecoilState(KDAstate);
  useEffect(() => {
    const exist = KDAdata.filter(
      (data: any) => data.gameId === gameData?.info.gameId
    );
    if (exist[0]) {
    } else {
      if (gameData && Me?.challenges?.kda) {
        const newData = {
          gameId: gameData?.info.gameId,
          kda: Me?.challenges.kda,
          championName: Me?.championName,
          win: Me?.win,
        };
        setKDAdata([...KDAdata, newData]);
      }
    }
  });
  return (
    <Wrapper>
      {Me && (
        <Container>
          <Overlay win={Me.win} open={open} />
          <Box win={Me.win}>
            <LeftBox size={size}>
              <GameInfo size={size}>
                <Gamemode size={size} win={Me.win}>
                  {gameMode}
                </Gamemode>
                {size !== "Small" && (
                  <>
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
                  </>
                )}
                {size === "Small" && (
                  <Data>
                    {time}:{Math.floor(gameData?.info.gameDuration - time * 60)}
                  </Data>
                )}
              </GameInfo>
              <ChampInfo>
                <ChampBox>
                  <Champ
                    size={size}
                    id={data}
                    src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${Me.championName}.png`}
                  />
                  <Level size={size}>{Me.champLevel}</Level>
                </ChampBox>
                <ColBox>
                  <Spell
                    size={size}
                    src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/${spell1?.[0]}.png`}
                  />
                  <Spell
                    size={size}
                    src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/${spell2?.[0]}.png`}
                  />
                </ColBox>
                <ColBox>
                  <Rune
                    size={size}
                    style={{ backgroundColor: "black", borderRadius: "50%" }}
                    src={`https://ddragon.leagueoflegends.com/cdn/img/${Rune1?.icon}`}
                  />
                  <Rune
                    size={size}
                    src={`https://ddragon.leagueoflegends.com/cdn/img/${Rune2?.icon}`}
                  />
                </ColBox>
              </ChampInfo>
              {size === "Small" && (
                <>
                  <Data>
                    {days}
                    {daysW}
                  </Data>
                </>
              )}
            </LeftBox>
            <KDABox size={size}>
              <RowBox>
                <KDA>{Me?.kills}</KDA>
                <KDA>/</KDA>
                <KDA style={{ color: "red" }}>{Me?.deaths}</KDA>
                <KDA>/</KDA>
                <KDA>{Me?.assists} ⚔</KDA>
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
                {Ace && <AceH1 size={size}>{Ace}</AceH1>}
                {Me.firstBloodKill && <AceH1 size={size}>FK</AceH1>}
                {Me.firstTowerKill && <AceH1 size={size}>FTK</AceH1>}
              </RowBox>
            </KDABox>
            <ItemBox size={size}>
              <Items size={size}>
                {items?.map((item, index) => (
                  <Container key={index}>
                    {item ? (
                      <Item
                        src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${item}.png`}
                      />
                    ) : (
                      <Item />
                    )}
                  </Container>
                ))}
              </Items>
              <ColBox style={{ gap: "2px", alignItems: "flex-end" }}>
                <Data>
                  CS {Me?.totalMinionsKilled} (
                  {(Me?.totalMinionsKilled / time).toFixed(1)})
                </Data>
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
          <ArrowBox
            onClick={() => setOpen((prev) => !prev)}
            open={open}
            win={Me.win}
          >
            <FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} />
          </ArrowBox>
        </Container>
      )}
      {open && (
        <OpenMatch
          gameData={gameData}
          spellData={spellData}
          runeData={runeData}
          Me={Me}
        />
      )}
    </Wrapper>
  );
};
