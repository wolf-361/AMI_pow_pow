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

  /**
   * Start the game
   * @param gameCode The game code 
   * @returns True if the game was started successfully
   */
  public startGame(gameCode: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.socket.emit('startGame', gameCode, (success: boolean) => {
        resolve(success);
      });
    });
  }

  /**
   * Register a new player
   * @param username Player username
   * @returns True if the player was registered successfully
   */
  public registerPlayer(username: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.socket.emit('registerPlayer', username, (success: boolean) => {
        resolve(success);
      });
    });
  }

  /**
   * Join a game
   * @param username Player username
   * @param gameCode Game code
   * @returns True if the player joined the game successfully
   */
  public joinGame(username: string, gameCode: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.socket.emit('joinGame', username, gameCode, (success: boolean) => {
        resolve(success);
      });
    });
  }


  

}
