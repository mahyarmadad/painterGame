import {useEffect} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import io from "socket.io-client";
import {onlineUsersRecoil, userRecoil} from "../recoil/user";

let socketRef = null;

export const useSocket = () => {
  const user = useRecoilValue(userRecoil);
  const setOnlineUsers = useSetRecoilState(onlineUsersRecoil);

  useEffect(() => {
    if (!user) return;
    const socket = io("http://localhost:4000");
    if (!socket) return;
    socketRef = socket;

    socket.on("connect", () => {
      console.log("connect", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
    socket.on("onlineUsers", ({onlineUsers}) => {
      setOnlineUsers(onlineUsers);
    });
    return () => {
      socket.disconnect();
      socketRef = null;
    };
  }, [user, setOnlineUsers]);

  useEffect(() => {
    socketRef?.on("user-exist", (data) => {
      console.log("user-exist", data);
    });
  }, []);
};

export const sendMessage = () => {
  socketRef?.emit("");
};
export const sendNewUser = (username) => {
  socketRef?.emit("newUser", username);
};
export const socketStartDraw = (obj) => {
  socketRef?.emit("startDraw", obj);
};
export const socketDraw = (obj) => {
  socketRef?.emit("draw", obj);
};
export const socketStopDraw = () => {
  socketRef?.emit("stopDraw", {});
};
