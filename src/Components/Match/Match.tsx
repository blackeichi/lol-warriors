import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getGames } from "../../util/api";

const Box = styled.div`
  width: 90vw;
  height: 200px;
  background-color: lightgray;
`;

type Idata = {
  data: string;
};

export const Match: React.FC<Idata> = ({ data }) => {
  const { data: gameData, refetch } = useQuery(["gameData"], () =>
    getGames(data)
  );
  console.log(gameData);
  return <Box></Box>;
};
