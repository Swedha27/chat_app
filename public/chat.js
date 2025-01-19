const socket = io();
let username = "Anonymous";

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const themeToggle = document.getElementById("theme-toggle");

// Theme toggle functionality
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  // Update button text based on the current theme
  themeToggle.textContent = document.body.classList.contains("dark-theme")
    ? "Switch to Light Theme"
    : "Switch to Dark Theme";
});

// Set username
const usernameForm = document.getElementById("username-form");
usernameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const usernameInput = document.getElementById("username").value.trim();
  if (usernameInput) {
    username = usernameInput;
    document.getElementById("welcome-section").style.display = "none";
  } else {
    alert("Username cannot be empty");
  }
});

// Send message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    const timestamp = new Date().toLocaleTimeString();
    socket.emit("chat message", { username, message: input.value.trim(), timestamp });
    input.value = "";
  } else {
    alert("Message cannot be empty");
  }
});

// Display chat messages
socket.on("chat message", (data) => {
  displayMessage(data);
});

// Load chat history
socket.on("chat history", (history) => {
  history.forEach(displayMessage);
});

// Function to display a message
function displayMessage(data) {
  const item = document.createElement("div");
  item.classList.add("message");
  item.classList.add(data.username === username ? "sent" : "received");
  item.innerHTML = `<strong>${data.username} (${data.timestamp})</strong>: ${data.message}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
}
