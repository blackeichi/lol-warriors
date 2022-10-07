import { response } from "express";

const API_KEY = process.env.REACT_APP_API;
const BASE_URL = ".api.riotgames.com/lol/";

export type userInterface = {
  id: string;
  name: string;
  profileIconId: number;
  puuid: string;
  revisionDate: number;
  summonerLevel: number;
};

export function getPuuid(server: string, id: string) {
  return fetch(
    `https://${server}${BASE_URL}summoner/v4/summoners/by-name/${id}?api_key=${API_KEY}`
  ).then((response) => response.json());
}
export function getRank(id: string) {
  return fetch(
    `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`
  ).then((response) => response.json());
}
