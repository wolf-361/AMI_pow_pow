import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit {
  public gameCode: string | void = '';
 
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.gameCode = this.apiService.createGame();

    // If the game code is not valid, redirect to the home page
    if (!this.gameCode || this.gameCode.length !== 4 || !this.gameCode.match('^[a-zA-Z0-9]*$')) {
      window.location.href = '/';
      // TODO: Show an error message
    }
  }
}
