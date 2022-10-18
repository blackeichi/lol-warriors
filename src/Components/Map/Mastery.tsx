import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { getChap, IChamp } from "../../util/api";
import { KDAstate } from "../../util/atom";

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
`;
const RowBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;
const ChapImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const ChampInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
`;
const ChampInfoTitle = styled.h1`
  font-weight: bold;
`;
const ChampInfoContent = styled.h1`
  color: darkgray;
`;

type Interface = {
  Champ: IChamp;
  data: any;
};

export const Mastery: React.FC<Interface> = ({ Champ, data }) => {
  const ChapData = Object.entries(data.data).find(
    (arr: any) => arr[1].key === String(Champ?.championId)
  );

  return (
    <Box>
      {ChapData && (
        <>
          <RowBox style={{ justifyContent: "flex-start" }}>
            <ChapImg
              src={`https://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${ChapData[0]}.png`}
            ></ChapImg>
            <ChampInfo style={{ alignItems: "flex-start" }}>
              <ChampInfoTitle>{ChapData[0]}</ChampInfoTitle>
              <ChampInfoContent>LV.{Champ.championLevel}</ChampInfoContent>
            </ChampInfo>
          </RowBox>
          <RowBox style={{ gap: "10px" }}>
            <ChampInfo>
              <ChampInfoTitle>숙련도</ChampInfoTitle>
              <ChampInfoContent>{Champ.championPoints + "점"}</ChampInfoContent>
            </ChampInfo>
          </RowBox>
        </>
      )}
    </Box>
  );
};
