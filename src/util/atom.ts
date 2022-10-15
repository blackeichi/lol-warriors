import { atom } from "recoil";

const getLang = window.localStorage.getItem("Lang");
const parsedLang = JSON.parse(getLang as string);

export const resizeState = atom({
  key: "resize",
  default: "Web" || "Mid" || "Mobile",
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
export const searchRange = atom({
  key: "searchRange",
  default: 20,
});
