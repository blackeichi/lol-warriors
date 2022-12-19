import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Color } from "../../util/color";

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
const Container = styled.div`
  display: grid;
  width: 95%;
  grid-template-columns: 2.2fr 1fr 1fr;
`;
const RowBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const ColBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RecentKDA: React.FC<Props> = ({ champ, KDAdata }) => {
  //---get KDA Data
  const [kda, setKda] = useState() as any;
  const [wins, setWins] = useState() as any;
  const gameData = KDAdata.filter((data: any) => data.championName === champ);
  const { t } = useTranslation();
  useEffect(() => {
    if (gameData?.length > 0) {
      setKda(
        (
          gameData?.reduce((prev: any, current: any) => {
            return prev + current?.kda;
          }, 0) / gameData.length
        ).toFixed(2)
      );
      setWins(
        (
          (gameData?.reduce((prev: any, current: any) => {
            if (current?.win) {
              return prev + 1;
            } else {
              return prev;
            }
          }, 0) /
            gameData.length) *
          100
        ).toFixed(0)
      );
    }
  });
  return (
    <Container>
      <RowBox>
        <ChapImg
          src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champ}.png`}
        ></ChapImg>
        <ColBox>
          <Text>{champ}</Text>
          <RowBox>
            <Text
              style={{ fontSize: "12px", color: "#9055A2", fontWeight: "bold" }}
            >
              {gameData?.length}
            </Text>
            <Text style={{ fontSize: "12px" }}>Games</Text>
          </RowBox>
        </ColBox>
      </RowBox>
      <ColBox style={{ alignItems: "center" }}>
        <Title>KDA</Title>
        <Text
          style={{
            color:
              kda >= 5
                ? Color.redColr
                : kda >= 4
                ? Color.blueColr
                : kda >= 3
                ? Color.greenColor
                : "gray",
            fontWeight: "bold",
          }}
        >
          {kda}:1
        </Text>
      </ColBox>
      <ColBox style={{ alignItems: "end" }}>
        <Title>{t("winningRate")}</Title>
        <Text>{wins}%</Text>
      </ColBox>
    </Container>
  );
};
