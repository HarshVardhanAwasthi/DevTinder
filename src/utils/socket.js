const socket = require("socket.io");
const { Chat } = require("../models/chat");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    //Handle Events
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const room = [userId, targetUserId].sort().join("_");
      console.log(firstName + " joinded the room: " + room);
      socket.join(room);
    });
    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        try {
          const room = [userId, targetUserId].sort().join("_");
          console.log(firstName + " " + text);

          let chat=await Chat.findOne({
            participants:{$all:[userId,targetUserId]},
          });

          if(!chat){
            chat=new Chat({
              participants:[userId,targetUserId],
              messages:[],
            })
          };
          
          chat.messages.push({
            senderId:userId,
            text,
          });

          await chat.save();

          io.to(room).emit("messageReceived", { firstName, lastName, text});

        } catch (error) {
          console.log(error);
        }
        
      }
    );
    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
