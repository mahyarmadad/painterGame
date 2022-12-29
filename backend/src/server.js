import express from "express";
import cors from "cors";
import socketIO from "socket.io";
import {
  addSocketUser,
  checkUser,
  emitOnlineUsers,
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
  checkUser(socket);

  socket.on("newUser", (data) => {
    addSocketUser(socket.id, data);
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
