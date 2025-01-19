const mongoose = require("mongoose");

// Define schema for chat messages
const chatMessageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: String, required: true },
});

// Create model
const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

module.exports = ChatMessage;
