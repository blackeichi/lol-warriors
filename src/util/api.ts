const API_KEY = process.env.REACT_APP_API;
const BASE_URL = ".api.riotgames.com/lol/";

export interface IUser {
  username: string;
  server: string;
}

export type userInterface = {
  id: string;
  name: string;
  profileIconId: number;
  puuid: string;
  revisionDate: number;
  summonerLevel: number;
};
export type rankInterface = [
  {
    leagueId: string;
    leaguePoints: number;
    losses: number;
    queueType: string;
    rank: string;
    summonerId: string;
    summonerName: string;
    tier: string;
    wins: number;
  }
];

export function getPuuid(server: string, id: string) {
  return fetch(
    `https://${server}${BASE_URL}summoner/v4/summoners/by-name/${id}?api_key=${API_KEY}`
  ).then((response) => response.json());
}
export function getRank(userid: string) {
  return fetch(
    `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${userid}?api_key=${API_KEY}`
  ).then((response) => response.json());
}
