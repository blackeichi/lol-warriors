import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getRank, IMatch } from "../../util/api";
import { resizeState, serverState } from "../../util/atom";

const Box = styled.div<{ size: string; me: boolean | undefined; win: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: ${(props) =>
    props.size === "Mid" ? "space-around" : "space-between"};
  font-family: "MonoplexKR-Regular";
  background-color: ${(props) =>
    props.me ? (props.win ? props.theme.darkBlue : props.theme.darkRed) : ""};
  font-size: ${(props) => (props.size === "Small" ? "2.3vw" : "15px")};
`;
const RowBox = styled.div`
  display: flex;
`;
const Wrapper = styled.div<{ size: string }>`
  display: flex;
  width: 30%;
  gap: ${(props) =>
    props.size === "Mid" ? "5px" : props.size === "Small" ? "10px" : ""};
  flex-direction: ${(props) => (props.size === "Small" ? "column" : "row")};
`;
const IconBox = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  display: flex;
`;
const Level = styled.h1`
  position: absolute;
  background-color: black;
  color: white;
  padding: 3px;
  border-radius: 50%;
  bottom: -7px;
  left: -7px;
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
const UserInfo = styled.div<{ size: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.size !== "Small" && "5px"};
`;
const Username = styled.h1<{ me?: boolean; size: string }>`
  font-weight: bold;
  font-size: ${(props) => (props.size === "Small" ? "3vw" : "14px")};
  color: ${(props) => (props.me ? props.theme.bgColr : "black")};
  cursor: pointer;
`;
const Tier = styled.h1<{ tier: string; size: string }>`
  color: darkgray;
  font-size: ${(props) =>
    props.size !== "Mobile" && props.size !== "Small" ? "12px" : "2vw"};
`;
const ChartBox = styled.div<{ size: string }>`
  display: ${(props) => (props.size === "Small" ? "none" : "flex")};
  gap: ${(props) =>
    props.size !== "Mobile" && props.size !== "Small" ? "5px" : ""};
  flex-direction: ${(props) =>
    props.size !== "Mobile"
      ? props.size !== "Small"
        ? "row"
        : "column"
      : "column"};
`;
const ProgressBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Text = styled.h1``;
const KDA = styled.h1<{ kda: number }>`
  font-size: 15px;
  color: ${(props) =>
    props.kda > 5 ? "orange" : props.kda > 3 ? "#76b39d" : "black"};
  font-weight: bold;
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
const Taken = styled.div<{ taken: number }>`
  background-color: darkgray;
  width: ${(props) => props.taken + "%"};
  height: 100%;
`;
const Items = styled.div`
  display: flex;
  gap: 2px;
`;
const Item = styled.img`
  width: 25px;
  background-color: black;
`;

type IType = {
  user: IMatch;
  spellData: any;
  runeData: any;
  maxDealt: number;
  maxTaken: number;
  totalKill: number;
  me?: boolean;
};

export const EachUser: React.FC<IType> = ({
  user,
  spellData,
  runeData,
  maxDealt,
  maxTaken,
  totalKill,
  me,
}) => {
  const size = useRecoilValue(resizeState);
  //-----Navigate Event
  const navigate = useNavigate();
  const onMove = () => {
    navigate(`/summoner?username=${user.summonerName}`);
    window.location.reload();
  };
  // get Tier
  const server = useRecoilValue(serverState);
  const { data: tierData } = useQuery([user.summonerId], () =>
    getRank(server, user.summonerId)
  );
  const soloTier = tierData?.find(
    (tier: any) => tier?.queueType === "RANKED_SOLO_5x5"
  );
  //-----getSpell
  const spell1 = Object.entries(spellData.data).find(
    (da: any) => da[1].key === String(user?.summoner1Id)
  );
  const spell2 = Object.entries(spellData.data).find(
    (da: any) => da[1].key === String(user?.summoner2Id)
  );
  //-----getRune
  const Primar = runeData?.find(
    (da: any) => da.id === user?.perks.styles[0].style
  );
  const Rune1 = Primar?.slots[0].runes.find(
    (da: any) => da.id === user?.perks.styles[0].selections[0].perk
  );
  const Rune2 = runeData?.find(
    (da: any) => da.id === user?.perks.styles[1].style
  );
  //-----get Progress Data
  const dealt = Math.floor((user.totalDamageDealtToChampions / maxDealt) * 100);
  const taken = Math.floor((user.totalDamageTaken / maxTaken) * 100);
  //-----getItem
  const items = [
    user.item0,
    user.item1,
    user.item2,
    user.item3,
    user.item4,
    user.item5,
    user.item6,
  ];
  //-----getKda
  const kda = (user.kills + user.assists) / user.deaths;

  return (
    <Box win={user.win} me={me} size={size}>
      <Wrapper size={size}>
        <RowBox>
          <IconBox>
            <ChampImg
              src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${user.championName}.png`}
            />
            <Level>{user.champLevel}</Level>
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
        </RowBox>
        <UserInfo size={size}>
          <Username size={size} onClick={onMove} me={me}>
            {user.summonerName}
          </Username>
          <Tier size={size} tier={soloTier}>
            {soloTier ? soloTier?.tier + " " + soloTier?.rank : "UNRANKED"}
          </Tier>
        </UserInfo>
      </Wrapper>
      {size !== "Small" && (
        <ColBox style={{ width: "13%" }}>
          <Text>
            {user.kills +
              "/" +
              user.deaths +
              "/" +
              user.assists +
              "(" +
              Math.floor(((user.kills + user.assists) / totalKill) * 100) +
              "%)"}
          </Text>
          {kda && <KDA kda={kda}>{kda.toFixed(2)}:1</KDA>}
        </ColBox>
      )}
      {size !== "Small" && (
        <ColBox style={{ width: "20px" }}>
          <Text style={{ fontWeight: "bold" }}>CS</Text>
          <Text>{user.totalMinionsKilled}</Text>
        </ColBox>
      )}
      <ChartBox size={size}>
        <ProgressBox>
          <Text>{user.totalDamageDealtToChampions}</Text>
          <Progress>
            <Dealt dealt={dealt} />
          </Progress>
        </ProgressBox>
        <ProgressBox>
          <Text>{user.totalDamageTaken}</Text>
          <Progress>
            <Taken taken={taken} />
          </Progress>
        </ProgressBox>
      </ChartBox>
      <ColBox style={{ alignItems: "flex-end", gap: "2px" }}>
        <Items>
          {items?.map((item, index) => (
            <Items key={index}>
              {item ? (
                <Item
                  src={`https://ddragon.leagueoflegends.com/cdn/12.22.1/img/item/${item}.png`}
                />
              ) : (
                <Item />
              )}
            </Items>
          ))}
        </Items>
        <RowBox style={{ gap: "10px" }}>
          {size === "Small" && (
            <RowBox>
              <Text style={{ fontWeight: "bold" }}>CS : </Text>
              <Text>{user.totalMinionsKilled}</Text>
            </RowBox>
          )}
          <Text>
            <FontAwesomeIcon icon={faCoins} /> {user.goldEarned}
          </Text>
        </RowBox>
        {size === "Small" && (
          <RowBox style={{ gap: "10px" }}>
            <Text style={{ fontSize: "15px" }}>
              {user.kills +
                "/" +
                user.deaths +
                "/" +
                user.assists +
                "(" +
                Math.floor(((user.kills + user.assists) / totalKill) * 100) +
                "%)"}
            </Text>
            {kda && <KDA kda={kda}>{kda.toFixed(2)}:1</KDA>}
          </RowBox>
        )}
      </ColBox>
    </Box>
  );
};
