import { Injectable } from '@nestjs/common';
import { Player } from 'src/classes/player/player';

@Injectable()
export class PlayersService {
    private players: Player[];

    constructor() {
        this.players = [];
    }

    public getPlayer(playerId: string): Player {
        return this.players.find(player => player.socketId === playerId);
    }

    public removePlayer(player: Player): void {
        this.players = this.players.filter(p => p !== player);
    }

    public addPlayer(player: Player): void {
        this.players.push(player);
    } 
}
