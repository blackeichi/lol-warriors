import React from "react";
import styled from "styled-components";
import { IngameType } from "../../SummonerIngame";
import { EachInUser } from "./EachInUser";

const Box = styled.div`
  width: 100%;
  height: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;
const Header = styled.div``;

type TEach = {
  team: {
    teamId: number;
  };
  me: string;
  ingameData: IngameType;
};
export const EachTeam = ({ team, me, ingameData }: TEach) => {
  const users = ingameData?.participants?.filter(
    (user: any) => user.teamId === team.teamId
  );
  console.log(me);
  return (
    <Box>
      <Header></Header>
      {users.map((user) => (
        <div key={user.summonerId}>
          <EachInUser user={user} me={me} />
        </div>
      ))}
    </Box>
  );
};
