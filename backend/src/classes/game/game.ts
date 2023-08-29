import { BehaviorSubject } from 'rxjs';
import { Player } from '../player/player';

export class Game {
    private _gameCode: string;
    private _players: Player[];
    private _isLive: BehaviorSubject<boolean>;

    /**
     * Create a game    
     * @param gameCode The game's unique code
     */
    constructor(gameCode: string) {
        this._gameCode = gameCode;
        this._players = [];
        this._isLive = new BehaviorSubject(false)
    }

    public get gameCode(): string {
        return this._gameCode;
    }

    public get isLive(): BehaviorSubject<boolean> {
        return this._isLive;
    }

    public set isLive(isLive: boolean) {
        this._isLive.next(isLive);
    }

    public get players(): Player[] {
        return this._players;
    }

    /**
     * Check if the game has a specific player
     * @param player The player to check
     * @returns True if the player is in the game, false if not
     */
    public hasPlayer(player: Player): boolean {
        return this._players.includes(player);
    }

    /**
     * Add a player to the game
     * @param player The player to add
     * @returns True if the player was added, false if the player was already in the game
     */
    public addPlayer(player: Player): boolean {
        if (this._isLive) {
            throw new Error("Game is live");
        }
        if (this.hasPlayer(player)) {
            throw new Error("Player is already in the game");
        }
        if (player.isInGame()) {
            throw new Error("Player is already in a game");
        }
        this._players.push(player);
        player.game = this;
        return true;
    }

    /**
     * Remove a player from the game
     * @param player The player to remove
     * @returns True if the player was removed, false if the player was not in the game
     */
    public removePlayer(player: Player): boolean {
        if (!this.hasPlayer(player)) {
            throw new Error("Player is not in the game");
        }
        this._players.splice(this._players.indexOf(player), 1);
        player.game = undefined;
        return true;
    }

    /**
     * Remove all players from the game
     */
    public removeAllPlayers(): void {
        this._players.forEach((player) => {
            player.game = undefined;
        });
        this._players = [];
    }

}
