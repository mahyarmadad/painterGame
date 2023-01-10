import {chatMsgsRecoil, roomIsFullRecoil} from "@Recoil/chat";
import {drawRecoil, startDrawRecoil, stopDrawRecoil} from "@Recoil/drawing";
import {useEffect} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import io from "socket.io-client";
import {onlineUsersRecoil, userRecoil} from "../recoil/user";

let socketRef = null;

export const useSocket = () => {
  const user = useRecoilValue(userRecoil);
  const setOnlineUsers = useSetRecoilState(onlineUsersRecoil);
  const setRoomFull = useSetRecoilState(roomIsFullRecoil);
  const setChatMasseges = useSetRecoilState(chatMsgsRecoil);

  const setStartDraw = useSetRecoilState(startDrawRecoil);
  const setDraw = useSetRecoilState(drawRecoil);
  const setStopDraw = useSetRecoilState(stopDrawRecoil);

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

    socket.on("msg", (data) => {
      setChatMasseges((prev) => [...prev, data]);
    });
    socket.on("startDraw", (data) => {
      setStartDraw(data);
    });
    socket.on("draw", (data) => {
      setDraw(data);
    });
    socket.on("stopDraw", () => {
      setStopDraw(true);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    return () => {
      socket.disconnect();
      socketRef = null;
    };
  }, [user, setOnlineUsers, setRoomFull, setChatMasseges, setStartDraw, setDraw, setStopDraw]);
};

export const sendMessage = (data) => {
  socketRef?.emit("sendMsg", data);
};
export const socketStartDraw = (obj) => {
  socketRef?.emit("startDraw", {...obj, socketId: socketRef.id});
};
export const socketDraw = (obj) => {
  socketRef?.emit("draw", {...obj, socketId: socketRef.id});
};
export const socketStopDraw = () => {
  socketRef?.emit("stopDraw", {});
};
