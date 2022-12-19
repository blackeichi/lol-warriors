import React from "react";
import { useQueries, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getRank, rankInterface } from "../../../util/api";
import { resizeState, serverState } from "../../../util/atom";
import { TUser } from "../../SummonerIngame";

const Box = styled.div`
  width: 100%;
  height: 50px;
  border-left: 1px solid black;
`;
const Text = styled.h1``;
const RowBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const IconBox = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  display: flex;
`;
const ChampImg = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;
const ColBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Spell = styled.img`
  width: 20px;
`;
const Rune = styled.img`
  width: 20px;
`;
//승률 그래프
const ProgressBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Progress = styled.div`
  width: 60px;
  height: 10px;
  background-color: white;
`;
const Dealt = styled.div<{ dealt: number }>`
  background-color: ${(props) => props.theme.redColr};
  width: ${(props) => props.dealt + "%"};
  height: 100%;
`;
const Username = styled.h1<{ me?: boolean; size: string }>`
  font-weight: bold;
  font-size: ${(props) => (props.size === "Small" ? "3vw" : "14px")};
  color: ${(props) => (props.me ? props.theme.bgColr : "black")};
  cursor: pointer;
`;
const Tier = styled.div<{ size: string }>`
  color: darkgray;
  display: flex;
  gap: 4px;
  font-size: ${(props) =>
    props.size !== "Mobile" && props.size !== "Small" ? "12px" : "2vw"};
`;
type Tuser = {
  user: TUser;
  me: string;
  spellData: any;
  runeData: any;
  ChampData: any;
};

export const EachInUser = ({
  user,
  me,
  spellData,
  runeData,
  ChampData,
}: Tuser) => {
  const size = useRecoilValue(resizeState);
  const spell1 = Object.entries(spellData.data).find(
    (da: any) => da[1].key === String(user?.spell1Id)
  );
  const spell2 = Object.entries(spellData.data).find(
    (da: any) => da[1].key === String(user?.spell2Id)
  );
  const Primar = runeData?.find((da: any) => da.id === user?.perks.perkStyle);
  const Rune1 = Primar?.slots?.[0].runes.find(
    (da: any) => da.id === user?.perks.perkIds?.[0]
  );
  const Rune2 = runeData?.find((da: any) => da.id === user?.perks.perkSubStyle);
  const ChapData = Object.entries(ChampData?.data).find(
    (arr: any) => arr[1].key === String(user?.championId)
  );
  //-----Navigate User
  const navigate = useNavigate();
  const onMove = () => {
    navigate(`/summoner?username=${user.summonerName}`);
    window.location.reload();
  };
  //------검색된 유저인지
  const ItsMe = me === user.summonerName ? true : false;
  //------각 유저의 랭크 정보
  const server = useRecoilValue(serverState);
  const { data: rankData, isLoading: rankLoading } = useQuery(
    [user.summonerId],
    () => getRank(server, user.summonerId)
  );
  const rank: rankInterface = rankData?.filter(
    (da: any) => da.queueType === "RANKED_SOLO_5x5"
  );
  /*  let perks = user.perks.perkIds;
  const test = [] as any;
  perks.map((perk) => {
    perk = Primar?.slots?.[0].runes.find((da: any) => da.id === perk);
    test.push(perk);
  });
  console.log(test);*/

  return (
    <Box>
      <RowBox>
        <IconBox>
          <ChampImg
            src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${ChapData?.[0]}.png`}
          />
        </IconBox>
        <ColBox>
          <Spell
            src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/${spell1?.[0]}.png`}
          />
          <Spell
            src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/spell/${spell2?.[0]}.png`}
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
        <Username size={size} onClick={onMove} me={ItsMe}>
          {user.summonerName}
        </Username>
        <Tier size={size}>
          <h1>{rank?.[0] ? rank?.[0]?.tier + rank?.[0]?.rank : "UNRANKED"}</h1>
          <h1>{rank?.[0] ? "( " + rank?.[0]?.leaguePoints + "LP )" : ""}</h1>
        </Tier>
        {rank ? (
          <ProgressBox>
            <Text>
              {rank[0]?.wins && rank[0]?.losses
                ? Math.floor(
                    (rank[0].wins / (rank[0]?.wins + rank[0]?.losses)) * 100
                  ) + "%"
                : "0%"}
            </Text>
            <Progress>
              <Dealt
                dealt={
                  rank[0]?.wins && rank[0]?.losses
                    ? (rank[0].wins / (rank[0].wins + rank[0].losses)) * 100
                    : 0
                }
              />
            </Progress>
          </ProgressBox>
        ) : (
          ""
        )}
      </RowBox>
    </Box>
  );
};
