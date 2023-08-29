import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private gameCode: string = '';

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.gameCode = params['gameCode'];
    });

    // If the game code is not valid, redirect to the home page
    if (this.gameCode.length !== 4 || !this.gameCode.match('^[a-zA-Z0-9]*$')) {
      window.location.href = '/';
    }
  }

}
