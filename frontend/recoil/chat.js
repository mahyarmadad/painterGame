import {atom} from "recoil";

export const chatMsgsRecoil = atom({
  key: "chatMsgsRecoil",
  default: [],
});

export const roomIsFullRecoil = atom({
  key: "roomIsFullRecoil",
  default: false,
});
