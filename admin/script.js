//Connect to the socket.io server
const socket = io("http://localhost:3001");

//When the user clicks the start game button, send a createGame event to the server
document.getElementById("start-game-button").addEventListener("click", () => {
    socket.emit("createGame");
});

//When the server created a game, add it to the list
socket.on("createGameResponse", (gameId) => {
    document.getElementById("game-list").innerHTML += "<li id=" + gameId + " >" + gameId + " (0) </li>";
});

//When someone joins a game, update the player count
socket.on("joinGameResponse", (gameId, playerCount) => {
    document.getElementById(gameId).innerHTML = gameId + " (" + playerCount + ")";
});
