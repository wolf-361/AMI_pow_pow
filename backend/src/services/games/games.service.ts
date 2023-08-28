import { Injectable } from '@nestjs/common';
import { Game } from 'src/classes/game/game';

@Injectable()
export class GamesService {
    private games: Game[];
    private liveGames: Game[];

    constructor() {
        this.games = [];
        this.liveGames = [];
    }

    /**
     * Get a specific game
     * @param gameCode The game's unique code
     * @returns The game with the specified game code
     */
    public getGame(gameCode: string): Game {
        return this.games.find(game => game.gameCode === gameCode);
    }

    /**
     * Remove a game
     * @param game The game to remove
     */
    public removeGame(game: Game): void {
        // Remove the game from both lists
        this.games = this.games.filter(g => g !== game);
        this.liveGames = this.liveGames.filter(g => g !== game);

        // Remove all players from the game
        game.removeAllPlayers();
        
        // Remove the live listener
        game.isLive.unsubscribe();
    }

    /**
     * Create a new game
     * @returns
     */
    public createGame(): string {
        // Create a new game
        const gameCode = this.generateGameCode();
        const game = new Game(gameCode);
        this.games.push(game);

        // Listen to the game's isLive property
        game.isLive.subscribe(isLive => {
            if (isLive) {
                this.liveGames.push(game);
            } else {
                this.liveGames = this.liveGames.filter(g => g !== game);
            }
        });

        return gameCode;
    }

    /**
     * 
     * @returns A random 4-letter string
     */
    private generateGameCode(): string {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";

        for (let i = 0; i < 4; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        // Check if the game code is already in use
        if (this.games.find(game => game.gameCode === result)) {
            return this.generateGameCode();
        }

        // If the game code is not in use, return it
        return result;
    }

}
