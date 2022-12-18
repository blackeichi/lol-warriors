import React from "react";
import styled from "styled-components";
import { IngameType } from "../../SummonerIngame";
import { EachInUser } from "./EachInUser";

const Box = styled.div`
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;
const Header = styled.div``;

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
  return (
    <Box>
      <Header></Header>
      {users.map((user) => (
        <div key={user.summonerId}>
          <EachInUser
            spellData={spellData}
            runeData={runeData}
            ChampData={ChampData}
            user={user}
            me={me}
          />
        </div>
      ))}
    </Box>
  );
};
