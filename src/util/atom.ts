import { atom } from "recoil";

const getLang = window.localStorage.getItem("Lang");
const parsedLang = JSON.parse(getLang as string);

export const resizeState = atom({
  key: "resize",
  default: "Web" || "Mid" || "Mobile" || "Small",
});
export const langState = atom({
  key: "lang",
  default: parsedLang === null ? "ko" : parsedLang,
});
export const serverState = atom({
  key: "server",
  default: "kr",
});
export const wins = atom({
  key: "wins",
  default: [] as any,
});
export const defeats = atom({
  key: "defeats",
  default: [] as any,
});
export const searchRange = atom({
  key: "searchRange",
  default: 20,
});

export const myTeamEarn = atom({
  key: "myTeamEarn",
  default: 0,
});
export const EnemyTeamEarn = atom({
  key: "EnemyTeamEarn",
  default: 0,
});
export const KDAstate = atom({
  key: "KDAstate",
  default: [] as any,
});
export const InfoState = atom({
  key: "InfoState",
  default: false,
});
