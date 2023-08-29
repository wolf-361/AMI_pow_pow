import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit {
  public gameCode: string = '';
  public players?: { username: string }[];
  public scores?: { username: string, score: number }[];
  public displayedColumns: string[] = ['username'];
 
  constructor(
    private apiService: ApiService
    ) { }

  ngOnInit(): void {
    this.apiService.createGame().then((gameCode: string) => {
      this.gameCode = gameCode;
    });

    // Update players list every time 2 seconds
    setInterval(() => {
      this.apiService.getGamePlayers(this.gameCode).then((players: string[]) => {
        if (players.length > 0) {
          // Update the players list by adding a number to each player
          this.players = players.map((player: string) => {
            return { username: player };
          });
        }
      });
    }, 2000);
  }

  public startGame(): void {
    this.apiService.startGame(this.gameCode).then((success: boolean) => {
      if (!success) {
        alert('Game could not be started');
      }
    });

    // Once the game is started, show the score board and update it every second
    setInterval(() => {
      this.apiService.getGameScores(this.gameCode).then((scores: { username: string, score: number }[]) => {
        if (scores.length > 0) {
          this.scores = scores;
        }
      });
    }, 1000);
  }
}
