const API_KEY = process.env.REACT_APP_API;
const BASE_URL = "https://kr.api.riotgames.com/lol/";

export function getPuuid(id: string) {
  return fetch(
    `${BASE_URL}summoner/v4/summoners/by-name/${id}?api_key=${API_KEY}`
  )
    .then((response) => response.json())
    .catch((e) => console.log(e));
}
