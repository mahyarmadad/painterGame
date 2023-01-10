import {atom} from "recoil";

export const startDrawRecoil = atom({
  key: "startDrawRecoil",
  default: null,
});
export const drawRecoil = atom({
  key: "drawRecoil",
  default: null,
});
export const stopDrawRecoil = atom({
  key: "stopDrawRecoil",
  default: false,
});
