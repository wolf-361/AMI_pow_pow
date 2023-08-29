import { Injectable } from '@nestjs/common';
import { Player } from 'src/classes/player/player';

@Injectable()
export class PlayersService {
    private players: Player[];

    constructor() {
        this.players = [];
    }

    public getPlayer(username: string): Player {
        return this.players.find(player => player.username === username);
    }

    public removePlayer(player: Player): void {
        this.players = this.players.filter(p => p !== player);
    }

    public addPlayer(player: Player): boolean {
        if (this.players.find(p => p.username === player.username)) {
            return false;
        }
        this.players.push(player);
        return true;
    } 
}
