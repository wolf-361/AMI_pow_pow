import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private socket: Socket) { }

  public createGame(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.socket.emit('createGame', (gameCode: string) => {
        resolve(gameCode);
      });
    });
  }
}
