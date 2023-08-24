import express from 'express';
import socketio from 'socket.io';

const { Server } = require('socket.io');

import { Game } from './models/game';
import { Player } from './models/player';
import { generateGameCode } from './utils/games';

const io = new Server({
    cors: {
        origin: '*',
    }
});


// The list of games
const games: Game[] = [];

// The list of players
const players: Player[] = [];

// When a client connects
io.on('connection', (socket) => {

    // When a client send it's username
    socket.on("registration", (username: string) => {
        const player = new Player();
        player.username = username;
        player.socketId = socket.id;
        player.score = 0;
        players.push(player);

        console.log(`Player ${player.username} registered with socket id ${player.socketId}`);
        socket.emit("registrationResponse", true);
    });

    // When the admin creates a game
    socket.on("createGame", () => {
        const game = new Game();
        game.gameCode = generateGameCode();
        game.players = [];
        game.isLive = false;
        games.push(game);

        console.log(`Game ${game.gameCode} created`);
        socket.emit("createGameResponse", game.gameCode);
    });

    // When a player joins a game by sending the game code
    socket.on("joinGame", (gameCode: string) => {

        // Find the game and the player
        const game = games.find((g) => g.gameCode === gameCode);
        const player = players.find((p) => p.socketId === socket.id);

        if (game && player) {
        // If the game and the player exist, add the player to the game

            game.players.push(player);
            console.log(`Player ${player.username} joined game ${game.gameCode}`);
            io.emit("joinGameResponse", game.gameCode, game.players.length);
            // Use "io" instead of "socket" to send the message to all the clients

        } else {
            socket.emit("joinGameResponse", null);
        }
    });
});

io.listen(3001);