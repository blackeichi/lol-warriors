import { atom } from "recoil";

export const pageState = atom({
  key: "pages",
  default: 0,
});

export const startState = atom({
  key: "start",
  default: false,
});

export const nextState = atom({
  key: "next",
  default: 1,
});
