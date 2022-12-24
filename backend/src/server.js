import express from "express";
import cors from "cors";
import socketIO from "socket.io";

const PORT = 4000;

const app = express();
app.use(cors());

const server = require("http").createServer(app);
const io = new socketIO.Server(server);

io.on("connection", (socket) => {
  console.log("a user connected", socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
