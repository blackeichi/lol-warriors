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
  KDAdata: any;
  data: any;
};

export const Mastery: React.FC<Interface> = ({ Champ, KDAdata, data }) => {
  const ChapData = Object.entries(data.data).find(
    (arr: any) => arr[1].key === String(Champ?.championId)
  );
  //---get KDA Data
  let KDA, kda;
  if (ChapData) {
    KDA = KDAdata.filter((data: any) => data.championName === ChapData[0]);
    if (KDA?.length > 0) {
      kda = KDA?.reduce((prev: any, current: any) => {
        return prev + current?.kda;
      }, 0);
    }
  }
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
              <ChampInfoContent>{Champ.championPoints + "점"}</ChampInfoContent>
            </ChampInfo>
          </RowBox>
          <RowBox style={{ gap: "10px" }}>
            <ChampInfo>
              <ChampInfoTitle>KDA</ChampInfoTitle>
              <ChampInfoContent>
                {kda ? (kda / KDA?.length).toFixed(2) : "전적없음"}
              </ChampInfoContent>
            </ChampInfo>
          </RowBox>
        </>
      )}
    </Box>
  );
};
