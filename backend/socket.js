
const { Server } = require("socket.io");
const io = new Server({
  cors: {
    origin: "*",
  },
});




io.on("connection", (socket) => {
  // `socket.id` is the id assigned to the user that connected
  console.log(`${socket.id} is connected` );





  socket.on("JOIN_ROOM", (data) => {
    console.log(data);
    socket.join(data);
  });

  socket.on("SEND_MESSAGE", (data) => {
    // data ={room  : 5 , content : "hello"}

    io.to(data.room).emit("RECEIVE_MESSAGE", data.content);

    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("user left ....");
  });
  
});
io.listen(3001);
// module.exports = io;
