// Connect to the server
const socket = io("http://localhost:3001");

// When the user clicks the register button, send a registration event to the server
document.getElementById("register-button").addEventListener("click", () => {
    const username = document.getElementById("username").value; 
    socket.emit("registration", username); 
});

// Send a demand to join a game
document.getElementById("join-button").addEventListener("click", () => {
    const gamecode = document.getElementById("gamecode").value;
    socket.emit("joinGame", gamecode);
});
