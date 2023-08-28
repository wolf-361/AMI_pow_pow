import { Game } from "../game/game";

export class Player {
    private _username: string;
    private _score: number;
    private _socketId: string;
    private _game: Game | undefined;

    /**
     * Create a player
     * @param username The player's username
     * @param socketId The player's socket ID
     */
    constructor(username: string, socketId: string) {
        this._username = username;
        this._score = 0;
        this._socketId = socketId;
    }

    public get username(): string {
        return this._username;
    }

    public get score(): number {
        return this._score;
    }

    public get socketId(): string {
        return this._socketId;
    }

    public get game(): Game | undefined {
        return this._game;
    }

    public set game(game: Game | undefined) {
        this._game = game;
    }

    public set score(score: number) {
        this._score = score;
    }
    
    public isInGame(): boolean {
        return this._game !== undefined;
    }
}
