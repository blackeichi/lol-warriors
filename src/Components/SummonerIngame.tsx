import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { resizeState } from "../util/atom";
import { getIngame, userInterface } from "../util/api";
import { useQuery } from "react-query";
import { Box, Erbox, Title } from "./SummonerBot";
import { useTranslation } from "react-i18next";

type Ipuuid = {
  userData: userInterface;
};
type Tban = {
  championId: number;
  teamId: number;
};
type TUser = {
  championId: 236;
  perks: { perkIds: number[]; perkStyle: number; perkSubStyle: number };
  profileIconId: number;
  spell1Id: number;
  spell2Id: number;
  summonerId: string;
  summonerName: string;
  teamId: number;
};
type IngameType = {
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
`;
const Header = styled.div`
  display: flex;
  width: 100%;
`;
const Text = styled.h1``;
const BoldText = styled(Text)`
  font-weight: bold;
`;

export const SummonerIngame = ({ userData }: Ipuuid) => {
  const size = useRecoilValue(resizeState);
  const { data: ingameData, refetch: ingameRe } = useQuery<IngameType>(
    ["ingameData"],
    () => getIngame(userData.id)
  );
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
  console.log(ingameData);
  console.log(userData.name);
  return (
    <Box size={size}>
      {ingameData ? (
        <Wrapper>
          <Header>
            <BoldText>{gameMode}</BoldText>
            <Text>
              {("0" + new Date(ingameData.gameStartTime).getHours()).slice(-2)}{" "}
              :&nbsp;
            </Text>
            <Text>{new Date(ingameData.gameStartTime).getMinutes()}</Text>
          </Header>
        </Wrapper>
      ) : (
        <Erbox>
          <Title>`{userData.name}`님은 게임중이 아닙니다.</Title>
          <Title>현재 게임중이라면 다시 시도해주세요.</Title>
        </Erbox>
      )}
    </Box>
  );
};
