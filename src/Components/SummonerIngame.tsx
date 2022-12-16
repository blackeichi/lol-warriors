import React from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { resizeState } from "../util/atom";
import { getIngame, userInterface } from "../util/api";
import { useQuery } from "react-query";
import { Box, Erbox, Title } from "./SummonerBot";

type Ipuuid = {
  userData: userInterface;
};

export const SummonerIngame = ({ userData }: Ipuuid) => {
  const size = useRecoilValue(resizeState);
  const { data: ingameData, refetch: ingameRe } = useQuery(["ingameData"], () =>
    getIngame(userData.id)
  );
  console.log(ingameData);

  return (
    <Box size={size}>
      {ingameData ? (
        <></>
      ) : (
        <Erbox>
          <Title>`{userData.name}`님은 게임중이 아닙니다.</Title>
          <Title>현재 게임중이라면 다시 시도해주세요.</Title>
        </Erbox>
      )}
    </Box>
  );
};
