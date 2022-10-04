const API_KEY = process.env.API_KEY;

const BASE_URL = "https://kr.api.riotgames.com/lol/";

/* export function getPuuid(id: string) {
  return fetch(`${BASE_URL}summoner/v4/summoners/by-name/${id}`).then(
    (response) => response.json()
  );
} */

export function getPuuid(id: string) {
  return fetch(`${BASE_URL}summoner/v4/summoners/by-name/${id}`).then(
    (response) => response.json()
  );
}
