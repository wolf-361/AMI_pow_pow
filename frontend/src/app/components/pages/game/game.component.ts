import { Component, ElementRef, OnInit } from '@angular/core';
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
  public score: number = 0;

  public countingScore: boolean = false;

  private isGameStarted!: BehaviorSubject<boolean>;
  private secondsToTap: number = 3; // The number of seconds to count taps for

  private username: string = '';

  
  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private elementRef: ElementRef
    ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.gameCode = params['gameCode'];
      this.username = params['username'];
    });

    // If the game code is not valid, redirect to the home page
    // TODO: Check if the game exists
    if (this.gameCode.length !== 4 || !this.gameCode.match('^[a-zA-Z0-9]*$')) {
      window.location.href = '/';
    }

    // Subscribe to game start
    this.isGameStarted = this.apiService.subscribeToGame(this.gameCode);

    // Log when the game starts
    this.isGameStarted.subscribe((isGameStarted: boolean) => {
      if (isGameStarted) {
        // Start the countdown
        this.countdown(this.secondsToTap).then(() => {
          this.countTaps(this.secondsToTap).then((score: number) => {
            // Send the score to the server
            this.apiService.sendPlayerScore(this.username, this.gameCode, score).then((success: boolean) => {
              if (success) {
                // Redirect to the scoreboard
                window.location.href = '/scoreboard/' + this.gameCode;
              } else {
                alert('An error occurred. Please try again.');
              }
            });
          });
        });        
      }
    });
  }

  /**
   * Count the number of taps on the screen in a given number of seconds
   * @param seconds The number of seconds to count taps for
   * @returns The number of taps in the given number of seconds
   */
  public async countTaps(seconds: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.countingScore = true;
      var count = 0;

      const clickHandler = () => {
        count++;
        this.score = count * 100;
      }

      this.elementRef.nativeElement.addEventListener('click', clickHandler);
      
      // Wait x seconds before removing the event listener
      setTimeout(() => {
        this.elementRef.nativeElement.removeEventListener('click' , clickHandler);
        this.countingScore = false;
        resolve(count);
      }, seconds * 1000);
    });
  }
  
  /**
   * Start a countdown timer
   * @param seconds The number of seconds to count down from
   */
  public async countdown(seconds: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.counter = seconds;
      var interval = setInterval(() => {
        this.counter--;

        if (this.counter <= 0) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });
  }
}
