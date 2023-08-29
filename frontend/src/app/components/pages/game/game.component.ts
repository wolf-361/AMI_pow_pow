import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public gameCode: string = '';
  public counter: number = 0;

  private isGameStarted!: BehaviorSubject<boolean>;
  private secondsToTap: number = 3; // The number of seconds to count taps for

  private username: string = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.gameCode = params['gameCode'];
      this.username = params['username'];
    });

    // If the game code is not valid, redirect to the home page
    if (this.gameCode.length !== 4 || !this.gameCode.match('^[a-zA-Z0-9]*$')) {
      window.location.href = '/';
    }

    // Subscribe to game start
    this.isGameStarted = this.apiService.subscribeToGame(this.gameCode);

    // Log when the game starts
    this.isGameStarted.subscribe((isGameStarted: boolean) => {
      if (isGameStarted) {
        // Count the number of taps on the screen
        var taps: number = this.countTaps(this.secondsToTap);

        // If the username is empty, alert the user and return
        if (this.username === '') {
          alert('Could not get username');
          return;
        }

        // If the number of taps is 0, alert the user and return
        if (taps === 0 || taps === null) {
          alert('Could not count taps')
          return;
        }

        // Send the number of taps to the server
        this.apiService.sendPlayerScore(this.username, this.gameCode, taps).then((success: boolean) => {
          if (!success) {
            alert('Could not send player score');
            return;
          }

          // Redirect to the score page
          window.location.href = `/score/${this.gameCode}`;
        });
      }
    });
  }

  /**
   * Count the number of taps on the screen in a given number of seconds
   * @param seconds The number of seconds to count taps for
   * @returns The number of taps in the given number of seconds
   */
  public countTaps(seconds: number): number {


    var count = 0;
    var startTime = new Date().getTime();
    var endTime = startTime + seconds * 1000;

    while (new Date().getTime() < endTime) {
      document.addEventListener('click', function () {
        count++;
      });
    }
    return count;
  }
  
  public countdown(seconds: number): void {
    var counter = seconds;
    var interval = setInterval(() => {
      this.counter = counter;
      counter--;

      if (counter < 0) {
        clearInterval(interval);
      }
    }, 1000);
  }
}
