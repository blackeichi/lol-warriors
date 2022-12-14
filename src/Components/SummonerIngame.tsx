import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { resizeState } from "../util/atom";
import {
  getChap,
  getIngame,
  getRune,
  getSpell,
  userInterface,
} from "../util/api";
import { useQuery } from "react-query";
import { Box, Erbox, Title } from "./SummonerBot";
import { useTranslation } from "react-i18next";
import { EachTeam } from "./Map/Ingame/EachTeam";
import { text } from "stream/consumers";

type Ipuuid = {
  userData: userInterface;
};
type Tban = {
  championId: number;
  teamId: number;
};
export type TUser = {
  championId: 236;
  perks: { perkIds: number[]; perkStyle: number; perkSubStyle: number };
  profileIconId: number;
  spell1Id: number;
  spell2Id: number;
  summonerId: string;
  summonerName: string;
  teamId: number;
};
export type IngameType = {
  bannedChampions: Tban[];
  gameId: number;
  gameLength: number;
  gameMode: string;
  gameQueueConfigId: number;
  gameStartTime: number;
  gameType: string;
  participants: TUser[];
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 40px;
  gap: 10px;
`;
const Text = styled.h1``;
const BoldText = styled(Text)`
  font-weight: bold;
`;
const EachWrapper = styled.div`
  width: fit-content;
`;
export const SummonerIngame = ({ userData }: Ipuuid) => {
  const size = useRecoilValue(resizeState);
  const { data: ingameData, refetch: ingameRe } = useQuery<IngameType>(
    ["ingameData2"],
    () => getIngame(userData.id)
  );
  //Get Rune, Spell, Champion Data
  const { data: spellData } = useQuery(["spellData2"], getSpell);
  const { data: runeData } = useQuery(["runeData2"], getRune);
  const { data: ChampData } = useQuery(["ChampData2"], getChap);
  const { t } = useTranslation();
  /* Get game mode */
  let gameMode;
  if (ingameData?.gameQueueConfigId === 400) {
    gameMode = t("norm");
  } else if (ingameData?.gameQueueConfigId === 420) {
    gameMode = t("solo");
  } else if (ingameData?.gameQueueConfigId === 430) {
    gameMode = t("norm");
  } else if (ingameData?.gameQueueConfigId === 440) {
    gameMode = t("flex");
  } else if (ingameData?.gameQueueConfigId === 450) {
    gameMode = t("aram");
  } else {
    gameMode = "Event";
  }
  /* Make Team */
  const [noon, setNoon] = useState("");
  useEffect(() => {
    if (ingameData) {
      setNoon(
        new Date(ingameData?.gameStartTime).getHours() >= 12 ? "PM" : "AM"
      );
    }
  }, [ingameData, ingameData?.gameStartTime]);
  const teams = [{ teamId: 100 }, { teamId: 200 }];
  return (
    <Box size={size}>
      {ingameData ? (
        <Wrapper>
          <Header>
            <BoldText>{gameMode}</BoldText>
            <div style={{ display: "flex" }}>
              <Text style={{ marginRight: "2px" }}>From</Text>
              <Text>
                {(
                  "0" +
                  (new Date(ingameData.gameStartTime).getHours() === 0
                    ? 12
                    : new Date(ingameData.gameStartTime).getHours() % 12)
                ).slice(-2)}{" "}
                :&nbsp;
              </Text>
              <Text>
                {("0" + new Date(ingameData.gameStartTime).getMinutes()).slice(
                  -2
                )}
              </Text>
              <Text>{noon}</Text>
            </div>
          </Header>
          <EachWrapper>
            {teams.map((team: any) => (
              <div key={team}>
                <EachTeam
                  spellData={spellData}
                  runeData={runeData}
                  team={team}
                  me={userData.name}
                  ingameData={ingameData}
                  ChampData={ChampData}
                />
              </div>
            ))}
          </EachWrapper>
        </Wrapper>
      ) : (
        <Erbox>
          <Title>`{userData.name}`?????? ???????????? ????????????.</Title>
          <Title>?????? ?????????????????? ?????? ??????????????????.</Title>
        </Erbox>
      )}
    </Box>
  );
};
