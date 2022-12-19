import React from "react";
import styled from "styled-components";
import { IngameType } from "../../SummonerIngame";
import { EachInUser } from "./EachInUser";

const Box = styled.div`
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;
const Header = styled.div``;
const Wrapper = styled.div`
  width: 100%;
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
  console.log(users);
  return (
    <Box>
      <Header></Header>
      <Wrapper>
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
