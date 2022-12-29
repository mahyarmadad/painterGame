const users = {};
let io = null;
export const setIO = (ioConnection) => (io = ioConnection);
export const getIO = () => io;
export const checkUser = (socket) => {
  let { id, user } = socket;
  if (users[user]) {
    socket.to(id).emit("user-exist", "Exist");
  }
};
export const addSocketUser = (socketId, username) =>
  (users[username] = socketId);
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
