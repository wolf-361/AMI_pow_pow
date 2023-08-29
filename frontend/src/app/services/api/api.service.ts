import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private socket: Socket) { }

  public createGame(): string | void {
    this.socket.emit('createGame').subscribe((gameCode: string) => {
      return gameCode;
    });
  }
}
