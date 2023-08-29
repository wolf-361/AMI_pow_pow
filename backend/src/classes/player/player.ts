import { generate } from "rxjs";
import { Game } from "../game/game";
import { v4 as uuidv4 } from 'uuid';

export class Player {
    private _username: string;
    private _score: number;
    private _id: string;
    private _game: Game | undefined;

    /**
     * Create a player
     * @param username The player's username
     * @param socketId The player's socket ID
     */
    constructor(username: string) {
        this._username = username;
        this._score = 0;
        this._id = uuidv4();
    }

    public get username(): string {
        return this._username;
    }

    public get score(): number {
        return this._score;
    }

    public get id(): string {
        return this._id;
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
