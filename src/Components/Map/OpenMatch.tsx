import React from "react";
import styled from "styled-components";
import { IMatch } from "../../util/api";
import { EachUser } from "../Map/EachUser";

const Box = styled.div<{ win: boolean }>`
  width: 100%;
  background-color: ${(props) =>
    props.win ? props.theme.blueBg : props.theme.redBg};
  border-left: 10px solid
    ${(props) => (props.win ? props.theme.blueColr : props.theme.redColr)};
  box-sizing: border-box;
  border-bottom-left-radius: 10px;
  margin-bottom: 10px;
  font-family: "MonoplexKR-Regular";
`;
const Wrapper = styled.div<{ win: boolean }>`
  background-color: ${(props) =>
    props.win ? props.theme.redBg : props.theme.blueBg};
`;
const RateBox = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 30px 0;
`;
const Icons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
`;
const IconBox = styled.div`
  display: flex;
  gap: 2px;
`;
const Icon = styled.img``;
const GrayText = styled.h1`
  color: darkgray;
`;
const ChartBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Chart = styled.div`
  width: 300px;
  display: flex;
  background-color: lightgray;
  height: 20px;
  position: relative;
  align-items: center;
`;
const ChartTextBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: absolute;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
`;
const ChartText = styled.h1`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;
const Progress = styled.div<{ width: number; win: boolean }>`
  width: ${(props) => props.width + "%"};
  height: 20px;
  background-color: ${(props) =>
    props.win ? props.theme.blueColr : props.theme.redColr};
`;
type IType = {
  gameData: any;
  spellData: any;
  runeData: any;
  Me: IMatch;
};

export const OpenMatch: React.FC<IType> = ({
  gameData,
  spellData,
  runeData,
  Me,
}) => {
  console.log(gameData);
  const maxDealt = gameData.info.participants.reduce(
    (prev: IMatch, current: IMatch) => {
      return prev.totalDamageDealtToChampions >
        current.totalDamageDealtToChampions
        ? prev
        : current;
    },
    0
  );
  const maxTaken = gameData.info.participants.reduce(
    (prev: IMatch, current: IMatch) => {
      return prev.totalDamageTaken > current.totalDamageTaken ? prev : current;
    },
    0
  );
  //-----TeamData
  const myMember = gameData.info.participants.filter(
    (user: IMatch) => user.teamId === Me.teamId
  );
  const eneMember = gameData.info.participants.filter(
    (user: IMatch) => user.teamId !== Me.teamId
  );
  const myTeam = gameData.info.teams.filter(
    (team: any) => team.teamId === Me.teamId
  )[0];
  const EnenyTeam = gameData.info.teams.filter(
    (team: any) => team.teamId !== Me.teamId
  )[0];
  const TotalKill1 = myTeam.objectives.champion.kills;
  const TotalKill2 = EnenyTeam.objectives.champion.kills;
  //-----get earned
  const myTeamMoney = myMember.reduce((prev: number, current: IMatch) => {
    return prev + current.goldEarned;
  }, 0);
  const enemyMoney = eneMember.reduce((prev: number, current: IMatch) => {
    return prev + current.goldEarned;
  }, 0);
  console.log(myTeamMoney);
  return (
    <Box win={Me.win}>
      {myMember.map((user: any) => (
        <EachUser
          key={user.summonerName}
          spellData={spellData}
          runeData={runeData}
          maxDealt={maxDealt.totalDamageDealtToChampions}
          maxTaken={maxTaken.totalDamageTaken}
          me={Me.summonerName === user.summonerName && true}
          totalKill={TotalKill1}
          user={user}
        />
      ))}
      <RateBox>
        <Icons>
          <IconBox>
            <Icon
              src={`https://s-lol-web.op.gg/images/icon/icon-baron${
                Me.win ? "" : "-r"
              }.svg`}
            />
            <GrayText>{myTeam.objectives.baron.kills}</GrayText>
          </IconBox>
          <IconBox>
            <Icon
              src={`https://s-lol-web.op.gg/images/icon/icon-dragon${
                Me.win ? "" : "-r"
              }.svg`}
            />
            <GrayText>{myTeam.objectives.dragon.kills}</GrayText>
          </IconBox>
          <IconBox>
            <Icon
              src={`https://s-lol-web.op.gg/images/icon/icon-tower${
                Me.win ? "" : "-r"
              }.svg`}
            />
            <GrayText>{myTeam.objectives.tower.kills}</GrayText>
          </IconBox>
        </Icons>
        <ChartBox>
          <Chart>
            <ChartTextBox>
              <ChartText>{myTeam.objectives.champion.kills}</ChartText>
              <ChartText>Total Kill</ChartText>
              <ChartText>{EnenyTeam.objectives.champion.kills}</ChartText>
            </ChartTextBox>
            <Progress
              width={
                (myTeam.objectives.champion.kills /
                  (myTeam.objectives.champion.kills +
                    EnenyTeam.objectives.champion.kills)) *
                100
              }
              win={myTeam.win}
            />
            <Progress
              width={
                (EnenyTeam.objectives.champion.kills /
                  (myTeam.objectives.champion.kills +
                    EnenyTeam.objectives.champion.kills)) *
                100
              }
              win={EnenyTeam.win}
            />
          </Chart>
          <Chart>
            <ChartTextBox>
              <ChartText>{myTeamMoney}</ChartText>
              <ChartText>Total Gold</ChartText>
              <ChartText>{enemyMoney}</ChartText>
            </ChartTextBox>
            <Progress
              width={(myTeamMoney / (myTeamMoney + enemyMoney)) * 100}
              win={myTeam.win}
            />
            <Progress
              width={(enemyMoney / (myTeamMoney + enemyMoney)) * 100}
              win={EnenyTeam.win}
            />
          </Chart>
        </ChartBox>
        <Icons>
          <IconBox>
            <Icon
              src={`https://s-lol-web.op.gg/images/icon/icon-baron${
                Me.win ? "-r" : ""
              }.svg`}
            />
            <GrayText>{EnenyTeam.objectives.baron.kills}</GrayText>
          </IconBox>
          <IconBox>
            <Icon
              src={`https://s-lol-web.op.gg/images/icon/icon-dragon${
                Me.win ? "-r" : ""
              }.svg`}
            />
            <GrayText>{EnenyTeam.objectives.dragon.kills}</GrayText>
          </IconBox>
          <IconBox>
            <Icon
              src={`https://s-lol-web.op.gg/images/icon/icon-tower${
                Me.win ? "-r" : ""
              }.svg`}
            />
            <GrayText>{EnenyTeam.objectives.tower.kills}</GrayText>
          </IconBox>
        </Icons>
      </RateBox>
      <Wrapper win={Me.win}>
        {eneMember.map((user: any) => (
          <EachUser
            key={user.summonerName}
            spellData={spellData}
            runeData={runeData}
            maxDealt={maxDealt.totalDamageDealtToChampions}
            maxTaken={maxTaken.totalDamageTaken}
            totalKill={TotalKill2}
            user={user}
          />
        ))}
      </Wrapper>
    </Box>
  );
};
