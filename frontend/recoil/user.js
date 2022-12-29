import {atom} from "recoil";

export const userRecoil = atom({
  key: "userRecoil",
  default: null,
});
export const onlineUsersRecoil = atom({
  key: "onlineUsersRecoil",
  default: [],
});
