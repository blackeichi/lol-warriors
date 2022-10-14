import { atom } from "recoil";

export const resizeState = atom({
  key: "resize",
  default: "Web" || "Mid" || "Mobile",
});
export const langState = atom({
  key: "lang",
  default: "ko" || "en" || "jp",
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
