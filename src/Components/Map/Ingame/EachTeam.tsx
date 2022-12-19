import React from "react";
import styled from "styled-components";
import { IngameType } from "../../SummonerIngame";
import { EachInUser } from "./EachInUser";

const Box = styled.div`
  width: 100%;
`;
const Header = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const Wrapper = styled.div<{ teamColor: string }>`
  width: 100%;
  padding: 10px 0;
  border-left: 5px solid ${(props) => props.teamColor};
  padding-left: 5px;
`;
const Text = styled.h1``;
const Bold = styled(Text)`
  font-weight: bold;
`;
type TEach = {
  team: {
    teamId: number;
  };
  me: string;
  ingameData: IngameType;
  spellData: any;
  runeData: any;
  ChampData: any;
};
export const EachTeam = ({
  team,
  me,
  ingameData,
  spellData,
  runeData,
  ChampData,
}: TEach) => {
  const users = ingameData?.participants?.filter(
    (user: any) => user.teamId === team.teamId
  );
  const teamColor = team.teamId === 100 ? "#13D8F6" : "#f76b8a";
  return (
    <Box>
      <Header style={{ color: teamColor }}>
        <Bold>{team.teamId === 100 ? "BLUE Team" : "RED Team"}</Bold>
      </Header>
      <Wrapper teamColor={teamColor}>
        {users.map((user, index) => (
          <div key={index}>
            <EachInUser
              spellData={spellData}
              runeData={runeData}
              ChampData={ChampData}
              user={user}
              me={me}
            />
          </div>
        ))}
      </Wrapper>
    </Box>
  );
};
