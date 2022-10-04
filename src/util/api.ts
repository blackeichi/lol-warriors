const API_KEY = process.env.API_KEY;
const request_header = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36",
  "Accept-Language": "ko,en-US;q=0.9,en;q=0.8,es;q=0.7",
  "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
  Origin: "https://developer.riotgames.com",
  "X-Riot-Token": API_KEY,
};
const BASE_URL = "https://kr.api.riotgames.com/lol/";

/* export function getPuuid(id: string) {
  return fetch(`${BASE_URL}summoner/v4/summoners/by-name/${id}`).then(
    (response) => response.json()
  );
} */

export function getPuuid(id: string) {
  return fetch(`${BASE_URL}summoner/v4/summoners/by-name/${id}`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36",
      "Accept-Language": "ko,en-US;q=0.9,en;q=0.8,es;q=0.7",
      "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      Origin: "https://developer.riotgames.com",
      "X-Riot-Token": "RGAPI-64d67202-dd10-4e0f-821f-79b1148ee627",
    },
  }).then((response) => response.json());
}
