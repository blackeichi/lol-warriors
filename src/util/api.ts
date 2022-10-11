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
export type IMatch = {
  assists: number;
  champLevel: number;
  championId: number;
  championName: string;
  firstBloodKill: boolean;
  firstTowerKill: boolean;
  goldEarned: number;
  kills: number;
  lane: string;
  pentaKills: number;
  puuid: string;
  role: string;
  spell1Casts: number;
  spell2Casts: number;
  spell3Casts: number;
  spell4Casts: number;
  summoner1Casts: number;
  summoner1Id: number;
  summoner2Casts: number;
  summoner2Id: number;
  summonerId: string;
  summonerLevel: number;
  summonerName: string;
  totalDamageDealtToChampions: number;
  win: true;
};

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
export function getMatchs(puuid: string, count: number) {
  return fetch(
    `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}&api_key=${API_KEY}`
  ).then((response) => response.json());
}
export function getGames(matchId: string) {
  return fetch(
    `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`
  ).then((response) => response.json());
}
export function getSpell() {
  return fetch(
    `https://ddragon.leagueoflegends.com/cdn/12.12.1/data/ko_KR/summoner.json`
  ).then((response) => response.json());
}
