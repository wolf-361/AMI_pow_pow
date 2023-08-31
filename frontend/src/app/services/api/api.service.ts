import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private socket: Socket) {}

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
   * Subscribe to game start
   * @param gameCode Game code
   * @returns A BehaviorSubject that emits true when the game starts
   */
  public subscribeToGame(gameCode: string): BehaviorSubject<boolean> {
    var isGameStarted: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
      false
    );

    this.socket.on('gameStarted', (gameCode: string) => {
      if (gameCode === gameCode) {
        isGameStarted.next(true);
      }
    });

    return isGameStarted;
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
   * @param gameCode Game code
   * @returns True if the player was registered successfully
   */
  public registerPlayer(username: string, gameCode: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        'registerPlayer',
        {
          username: username,
          gameCode: gameCode,
        },
        (success: boolean) => {
          resolve(success);
        }
      );
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

  /**
   * Send the player score to the server
   * @param username Player ID
   * @param gameCode Game code
   * @param score Number of taps
   * @returns True if the player score was sent successfully
   */
  public sendPlayerScore(
    username: string,
    gameCode: string,
    score: number
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        'sendPlayerScore',
        { username: username, gameCode: gameCode, score: score },
        (success: boolean) => {
          resolve(success);
        }
      );
    });
  }

  /**
   * Get the game scores
   * @param gameCode The game code
   * @returns A promise that resolves to an array of objects with the username and score of each player
   */
  public getGameScores(
    gameCode: string
  ): Promise<{ username: string; score: number }[]> {
    return new Promise((resolve, reject) => {
      this.socket.emit(
        'getGameScores',
        gameCode,
        (scores: { username: string; score: number }[]) => {
          resolve(scores);
        }
      );
    });
  }

  /**
   * Reset a game data
   * @param gameCode The game code
   * @returns True if the game was reset successfully
   */
  public resetGame(gameCode: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.socket.emit('resetGame', gameCode, (success: boolean) => {
        resolve(success);
      });
    });
  }
}
