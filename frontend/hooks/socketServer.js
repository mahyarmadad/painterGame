import {roomIsFullRecoil} from "@Recoil/chat";
import {useEffect} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import io from "socket.io-client";
import {onlineUsersRecoil, userRecoil} from "../recoil/user";

let socketRef = null;

export const useSocket = () => {
  const user = useRecoilValue(userRecoil);
  const setOnlineUsers = useSetRecoilState(onlineUsersRecoil);
  const setRoomFull = useSetRecoilState(roomIsFullRecoil);

  useEffect(() => {
    if (!user) return;
    const socket = io("http://localhost:4000");

    if (!socket) return;
    socketRef = socket;
    socket.on("connect", () => {
      console.log("connect", socket.id);
      socket.emit("newUser", user);
    });

    socket.on("full", (msg) => {
      setRoomFull(msg);
      return socket.disconnect();
    });

    socket.on("onlineUsers", ({onlineUsers}) => {
      setOnlineUsers(onlineUsers);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    return () => {
      socket.disconnect();
      socketRef = null;
    };
  }, [user, setOnlineUsers]);
};

export const sendMessage = (data) => {
  socketRef?.emit("sendMsg", data);
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
