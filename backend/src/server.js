import express from "express";
import cors from "cors";
import socketIO from "socket.io";
import {
  addSocketUser,
  emitOnlineUsers,
  getOnlineUsers,
  manageUserMsg,
  removeSocketUser,
  setIO,
} from "./socketStore";

const PORT = 4000;

const app = express();
app.use(cors());

const server = require("http").createServer(app);
const io = new socketIO.Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
setIO(io);

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("newUser", (data) => {
    addSocketUser(socket, data);
  });
  socket.on("sendMsg", (data) => {
    manageUserMsg(data);
  });

  socket.on("startDraw", (data) => {
    const users = getOnlineUsers();
    const otherUsers = Object.values(users).filter((v) => v !== data.socketId);
    io.to(otherUsers).emit("startDraw", data);
  });
  socket.on("draw", (data) => {
    const users = getOnlineUsers();
    const otherUsers = Object.values(users).filter((v) => v !== data.socketId);
    io.to(otherUsers).emit("draw", data);
  });
  socket.on("stopDraw", () => {
    const users = getOnlineUsers();
    const otherUsers = Object.values(users).filter((v) => v !== socket.id);
    io.to(otherUsers).emit("stopDraw");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeSocketUser(socket.id);
  });
});

setInterval(() => {
  emitOnlineUsers();
}, [8000]);

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
