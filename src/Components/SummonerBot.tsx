import React from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getMatchs } from "../util/api";
import { resizeState } from "../util/atom";
import { Match } from "./Match/Match";

const Box = styled.div<{ size: string }>`
  width: ${(props) => (props.size !== "Web" ? "95vw" : "98%")};
  max-width: 980px;
  background-color: ${(props) => props.theme.grayColr};
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;
const Right = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

type Ipuuid = {
  puuid: string;
  username: string;
};

export const SummonerBot: React.FC<Ipuuid> = ({ puuid, username }) => {
  const size = useRecoilValue(resizeState);
  const { data: matchData, refetch } = useQuery(["matchData"], () =>
    getMatchs(puuid, 20)
  );
  return (
    <Box size={size}>
      <Right>
        {matchData?.map((data: string) => (
          <Match key={data} data={data} username={username} />
        ))}
      </Right>
    </Box>
  );
};
