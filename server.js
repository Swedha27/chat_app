/*const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const ChatMessage = require("./models/chatMessage"); // Import chat schema

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Serve static files from the public directory
app.use(express.static("public"));

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Send chat history from MongoDB to the newly connected client
  ChatMessage.find()
    .then((messages) => socket.emit("chat history", messages))
    .catch((err) => console.error("Error fetching chat history:", err));

  // Handle new chat messages
  socket.on("chat message", (data) => {
    const chatMessage = new ChatMessage(data);
    chatMessage.save()
      .then(() => io.emit("chat message", data)) // Broadcast the message
      .catch((err) => console.error("Error saving message:", err));
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/*const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Successfully connected to MongoDB");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });*/
/*
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
    res.send('welcome, server is running');
});

app.listen(port, () => {
    console.log(`server is running at port ${port}`);
});*/
/*const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    mongoose.connection.close(); // Close connection after test
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });*/


  const express = require("express");
  const http = require("http");
  const { Server } = require("socket.io");
  const mongoose = require("mongoose");
  const ChatMessage = require("./models/chatMessage");
  
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);
  
  // MongoDB connection
  mongoose.connect("mongodb://127.0.0.1:27017/chat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));
  
  // Serve static files
  app.use(express.static("public"));
  
  // Fallback route to serve index.html
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
  
  // Handle Socket.IO connections
  io.on("connection", (socket) => {
    console.log("A user connected");
  
    // Send chat history from MongoDB to the newly connected client
    ChatMessage.find()
      .then((messages) => socket.emit("chat history", messages))
      .catch((err) => console.error("Error fetching chat history:", err));
  
    // Handle new chat messages
    socket.on("chat message", (data) => {
      const chatMessage = new ChatMessage(data);
      chatMessage.save()
        .then(() => io.emit("chat message", data)) // Broadcast the message
        .catch((err) => console.error("Error saving message:", err));
    });
  
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
  
  // Start the server
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  
