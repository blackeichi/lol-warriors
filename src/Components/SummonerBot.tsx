import React from "react";
import { useQuery } from "react-query";
import { getMatchs } from "../util/api";
import { Match } from "./Match/Match";

type Ipuuid = {
  puuid: string;
};

export const SummonerBot: React.FC<Ipuuid> = ({ puuid }) => {
  const { data: matchData, refetch } = useQuery(["matchData"], () =>
    getMatchs(puuid, 20)
  );
  return (
    <div>
      {matchData?.map((data: string) => (
        <Match key={data} data={data} />
      ))}
    </div>
  );
};
