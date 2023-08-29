import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private socket: Socket) { }

  /**
   * Create a new game and get the game code
   * @returns Promise<string> gameCode
   */
  public createGame(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.socket.emit('createGame', (gameCode: string) => {
        resolve(gameCode);
      });
    });
  }

  /**
   * Get all player names in a game
   * @param gameCode The game code
   * @returns Promise<string[]> players names
   */
  public getGamePlayers(gameCode: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.socket.emit('getGamePlayers', gameCode, (players: string[]) => {
        resolve(players);
      });
    });
  }
  
}
