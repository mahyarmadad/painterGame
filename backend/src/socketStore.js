const users = {};
let io = null;

export const setIO = (ioConnection) => (io = ioConnection);
export const getIO = () => io;

export const addSocketUser = (socket, username) => {
  if (users[username]) return io.to(socket.id).emit("full", "userExist");
  if (Object.keys(users).length === 2)
    return io.to(socket.id).emit("full", "roomFull");
  users[username] = socket.id;
};

export const removeSocketUser = (socketId) => {
  for (let key in users) {
    if (users[key] === socketId) {
      key = null;
    }
  }
};
export const getActiveConnections = (username) => users[username];
export const getOnlineUsers = () => users;
export const emitOnlineUsers = () =>
  io.emit("onlineUsers", { onlineUsers: users });

export const manageUserMsg = (data) => io.emit("msg", data);
