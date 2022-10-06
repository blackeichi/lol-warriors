const API_KEY = process.env.REACT_APP_API;
const BASE_URL = ".api.riotgames.com/lol/";

export function getPuuid(server: string, id: string) {
  return fetch(
    `https://${server}${BASE_URL}summoner/v4/summoners/by-name/${id}?api_key=${API_KEY}`
  ).then((response) => response.json());
}
