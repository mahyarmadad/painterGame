import {atom} from "recoil";

export const chatHistoryRecoil = atom({
  key: "chatHistoryRecoil",
  default: [],
});

export const roomIsFullRecoil = atom({
  key: "roomIsFullRecoil",
  default: false,
});
