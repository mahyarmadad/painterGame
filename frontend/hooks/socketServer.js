import {useEffect} from "react";
import {useRecoilValue} from "recoil";
import io from "socket.io-client";
import {userRecoil} from "../recoil/user";

let socketRef = null;

export const useSocket = () => {
  const user = useRecoilValue(userRecoil);

  useEffect(() => {
    if (!user) return;
    const socket = io("http://localhost:5000");
    socketRef = socket;

    socket.on("connect", () => {
      console.log("connect", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    return () => {
      socket.disconnect();
      socketRef = null;
    };
  }, [user]);

  useEffect(() => {
    // socketRef?.on(
    //   "chat-history",
    //   (data) => {
    //     setChatHistory(data);
    //   },
    //   []
    // );
  }, []);
};

export const sendMessage = () => {
  socketRef?.emit("");
};
