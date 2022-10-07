import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getRank, rankInterface, userInterface } from "../util/api";

const Box = styled.div`
  width: 98%;
  max-width: 900px;
  background-color: ${(props) => props.theme.grayColr};
  border-radius: 10px;
  padding: 40px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
`;
const WrapperColOne = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const IconBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 120px;
  height: 120px;
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;
const Level = styled.h1`
  background-color: ${(props) => props.theme.blackColr};
  position: absolute;
  bottom: -20px;
  padding: 5px 10px;
  color: white;
  border-radius: 15px;
  font-family: "HBIOS-SYS";
`;
const NameBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Name = styled.h1`
  font-weight: bold;
  font-family: "MonoplexKR-Regular";
  font-size: 25px;
`;
const Reload = styled.h1`
  padding: 10px;
  background-color: ${(props) => props.theme.bgColr};
  color: white;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
`;

const WrapperColtwo = styled.div``;

type IUser = {
  userData: userInterface;
};

export const SummonerTop: React.FC<IUser> = ({ userData }) => {
  const { data: rankData, isLoading: rankLoading } = useQuery<rankInterface>(
    ["rankData"],
    () => getRank(userData.id)
  );
  const soloRank = rankData?.find(
    (rank) => rank.queueType === "RANKED_SOLO_5x5"
  );
  const teamRank = rankData?.find(
    (rank) => rank.queueType === "RANKED_FLEX_SR"
  );
  console.log(soloRank);
  return (
    <Box>
      <WrapperColOne>
        <IconBox>
          <Icon
            src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/profileicon/${userData.profileIconId}.png`}
          />
          <Level>{userData.summonerLevel}</Level>
        </IconBox>
        <NameBox>
          <Name>{userData.name}</Name>
          <Reload>전적 갱신</Reload>
        </NameBox>
      </WrapperColOne>
      {rankLoading ? <></> : <WrapperColtwo></WrapperColtwo>}
    </Box>
  );
};
