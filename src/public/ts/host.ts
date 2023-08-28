const io = require('socket.io-client')

// Connect to the socker server with the socket.io client
const socket = io.connect('http://localhost:3001');

/**
 * Create a game
 */
function createGame() {
    socket.emit("createGame");
}

/**
 * Show the game code
 */
socket.on("createGameResponse", (gameCode: string) => {
    console.log(`Game ${gameCode} created`);
});

/**
 * Show the number of players in the game
 */
socket.on("joinGameResponse", (gameCode: string, playerCount: number) => {
    console.log(`Game ${gameCode} has ${playerCount} players`);
});
