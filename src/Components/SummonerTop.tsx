import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getRank, rankInterface, userInterface } from "../util/api";
import { resizeState, serverState } from "../util/atom";

const Box = styled.div<{ size: string }>`
  width: 98%;
  max-width: 980px;
  background-color: ${(props) =>
    props.size !== "Web" ? "white" : props.theme.grayColr};
  border-radius: 10px;
  padding: 40px;
  border: ${(props) =>
    props.size !== "Web" ? "none" : "1px solid rgba(0, 0, 0, 0.2)"};
  display: flex;
  flex-direction: ${(props) => (props.size !== "Web" ? "column" : "row")};
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  box-sizing: border-box;
  gap: ${(props) => (props.size !== "Web" ? "50px" : "0")};
`;
const WrapperColOne = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const IconBox = styled.div<{ size: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  width: ${(props) =>
    props.size !== "Mobile"
      ? props.size === "Small"
        ? "30vw"
        : "120px"
      : "25vw"};
  height: ${(props) =>
    props.size !== "Mobile"
      ? props.size === "Small"
        ? "30vw"
        : "120px"
      : "25vw"};
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
const NameBox = styled.div<{ size: string }>`
  display: flex;
  align-items: ${(props) =>
    props.size !== "Mobile"
      ? props.size === "Small"
        ? "flex-start"
        : "center"
      : "flex-start"};
  gap: 10px;
  flex-direction: ${(props) =>
    props.size !== "Mobile"
      ? props.size === "Small"
        ? "column"
        : "row"
      : "column"};
`;
const Name = styled.h1<{ size: string }>`
  font-weight: bold;
  font-family: "MonoplexKR-Regular";
  font-size: ${(props) =>
    props.size !== "Mobile"
      ? props.size === "Small"
        ? "6vw"
        : "25px"
      : "6vw"};
`;
const Reload = styled.h1`
  padding: 10px;
  background-color: ${(props) => props.theme.bgColr};
  color: white;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
`;

const WrapperColtwo = styled.div<{ size: string }>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${(props) =>
    props.size !== "Web" ? props.theme.grayColr : "transparent"};
  width: ${(props) => (props.size !== "Web" ? "95vw" : "50%")};
  padding: ${(props) => (props.size !== "Web" ? "30px 0" : "0")};
  border: ${(props) =>
    props.size !== "Web" ? "1px solid rgba(0, 0, 0, 0.2)" : "none"};
  border-radius: 10px;
`;

const TierBox = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
`;

const Img = styled.img<{ size: string }>`
  width: ${(props) =>
    props.size !== "Mobile"
      ? props.size === "Small"
        ? "20vw"
        : "100px"
      : "20vw"};
  height: ${(props) =>
    props.size !== "Mobile"
      ? props.size === "Small"
        ? "20vw"
        : "100px"
      : "20vw"};
`;

const TierInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  font-family: "MonoplexKR-Regular";
`;

const TierTitle = styled.h1`
  font-size: 12px;
  font-weight: bold;
  color: darkgray;
`;
const Rank = styled.h1<{ tier?: string | undefined }>`
  color: ${(props) => (props.tier === undefined ? "darkgray" : "black")};
  font-weight: bold;
  font-size: 18px;
`;
const WinInfo = styled.h2`
  font-size: 13px;
  color: ${(props) => props.theme.darkGray};
`;
const InfoBox = styled.div`
  display: flex;
  gap: 5px;
`;

type IUser = {
  userData: userInterface;
};
type Iicon = {
  [index: string]: string;
};
const icons: Iicon = {
  IRON: "iron",
  BRONZE: "bronze",
  SILVER: "silver",
  GOLD: "gold",
  PLATINUM: "platinum",
  DIAMOND: "diamond",
  MASTER: "master",
  GRANDMASTER: "grandmaster",
  CHALLENGER: "challenger",
};

export const SummonerTop: React.FC<IUser> = ({ userData }) => {
  const { t } = useTranslation();
  const server = useRecoilValue(serverState);
  const {
    data: rankData,
    isLoading: rankLoading,
    refetch,
  } = useQuery<rankInterface>(["rankData"], () => getRank(server, userData.id));
  const soloRank = rankData?.find(
    (rank) => rank.queueType === "RANKED_SOLO_5x5"
  );
  const teamRank = rankData?.find(
    (rank) => rank.queueType === "RANKED_FLEX_SR"
  );
  const RankInfo: any = [soloRank, teamRank];
  const size = useRecoilValue(resizeState);
  useEffect(() => {
    refetch();
  }, [refetch, userData]);
  return (
    <Box size={size}>
      <WrapperColOne>
        <IconBox size={size}>
          <Icon
            src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/profileicon/${userData.profileIconId}.png`}
          />
          <Level>{userData.summonerLevel}</Level>
        </IconBox>
        <NameBox size={size}>
          <Name size={size}>{userData.name}</Name>
          <Reload
            onClick={() => {
              window.location.reload();
            }}
          >
            {t("update")}
          </Reload>
        </NameBox>
      </WrapperColOne>
      {rankLoading ? (
        <></>
      ) : (
        <WrapperColtwo size={size}>
          {RankInfo.map((info: rankInterface[0], index: number) => (
            <TierBox key={index}>
              <Img
                size={size}
                src={
                  info
                    ? `${process.env.PUBLIC_URL}/img/${icons[info.tier]}.png`
                    : `${process.env.PUBLIC_URL}/img/provisional.png`
                }
                alt="Tier"
              />
              <TierInfo>
                <TierTitle>
                  {index === 0 ? t("soloRank") : t("flexRank")}
                </TierTitle>
                <InfoBox>
                  <Rank tier={info?.tier}>{info ? info.tier : "Unranked"}</Rank>
                  <Rank tier={info?.tier}>{info ? info.rank : ""}</Rank>
                </InfoBox>
                <WinInfo>{info?.leaguePoints} LP</WinInfo>
                {info && (
                  <>
                    <WinInfo>
                      {t("rate")}&nbsp;
                      {Math.floor(
                        (info?.wins / (info?.wins + info?.losses)) * 100
                      )}
                      %
                    </WinInfo>
                    <InfoBox>
                      <WinInfo>
                        {info?.wins}
                        {t("wins")}
                      </WinInfo>
                      <WinInfo>
                        {info?.losses}
                        {t("losses")}
                      </WinInfo>
                    </InfoBox>
                  </>
                )}
              </TierInfo>
            </TierBox>
          ))}
        </WrapperColtwo>
      )}
    </Box>
  );
};
