import React from "react";
import styled from "styled-components";

const ChapImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const Text = styled.h1`
  color: gray;
`;
const Title = styled(Text)`
  font-weight: bold;
  color: blaCK;
`;
type Props = {
  champ: string;
  KDAdata: any;
};

const RowBox = styled.div`
  display: flex;
  width: 95%;
  align-items: center;
  gap: 5px;
`;
const ColBox = styled.div``;

export const RecentKDA: React.FC<Props> = ({ champ, KDAdata }) => {
  //---get KDA Data
  let kda;
  const gameData = KDAdata.filter((data: any) => data.championName === champ);
  if (gameData?.length > 0) {
    kda = (
      gameData?.reduce((prev: any, current: any) => {
        return prev + current?.kda;
      }, 0) / gameData.length
    ).toFixed(2);
  }
  return (
    <RowBox>
      <RowBox>
        <ChapImg
          src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${champ}.png`}
        ></ChapImg>
        <Text>{champ}</Text>
      </RowBox>
      <ColBox>
        <Title>KDA</Title>
        <Text>{kda}:1</Text>
      </ColBox>
    </RowBox>
  );
};
