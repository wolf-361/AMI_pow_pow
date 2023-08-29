import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent {
  public gameCode: string = '';
 
  constructor(private socket: Socket) { }

  ngOnInit(): void {
    this.socket.emit('createGame');

    this.socket.on('gameCreated', (data: any) => {
      this.gameCode = data;
    });
  }
}
