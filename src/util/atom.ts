import { atom } from "recoil";

export const resizeState = atom({
  key: "resize",
  default: "Web" || "Mobile",
});
export const langState = atom({
  key: "lang",
  default: "ko",
});
