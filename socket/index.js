const { Server } = require("socket.io");

const { createServer } = require("node:http");
const express = require("express");
const cors = require("cors");
const app = express();
const server = createServer(app);
const io = new Server(server);

require("dotenv").config({
  path: "./.env",
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World Tiveno!");
});

let users = [];

let addUser = (userId, socketId) => {
  !users?.some((user) => user?.userId === userId) &&
    users?.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users?.filter((user) => user?.socketId !== socketId);
};

const getUser = (receiverId) => {
  return (users = users?.find((user) => user?.userId !== receiverId));
};
// Define a message object with a seen property
const createMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

io.on("connection", (socket) => {
  console.log("A user is connected");

  // Take userId and socketId from user
  socket.on("addUser", async (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //  send and get messages
  const messages = {}; // Object to track messages sent to each user

  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    const message = createMessage({ senderId, receiverId, text, images });

    const user = getUser(receiverId);

    // Store the messages  in the message object
    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }

    // send the message to the receiver

    io.to(user?.socketId).emit("getMessage", message);
  });

  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);

    // Update the seen for the message
    if (messages[senderId]) {
      const message = messages[senderId].find(
        (message) =>
          message?.receiverId === receiverId && message?.id === messageId
      );

      if (message) {
        message.seen = true;

        // send a message seen event to the sender
        io.to(user?.socketId).emit("messageSeen", {
          senderId,
          receiverId,
          messageId,
        });
      }
    }
  });

  // Update and get last message seen
  socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
    io.emit("getLastMessage", {
      lastMessage,
      lastMessageId,
    });
  });

  // When Disconnect
  socket.on("disconnect", () => {
    console.log("A User Is Disconnected");
    removeUser(socket?.id); // it is important
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT || 4000, () => {
  console.log(`server is running on port ${process.env.PORT || 4000}`);
});
