import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent {
  public gameForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z0-9]*$'),
    ]),
    gameCode: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.pattern('^[a-zA-Z]*$'),
    ]),
  });

  /**
   * Getter for easy access to form fields
   * @returns {Object} The form controls
   * @example form['email'].value
   */
  get form(): { [key: string]: AbstractControl } {
    return this.gameForm.controls;
  }

  constructor(
    private apiService: ApiService,
  ) { }

  public submit(): void {
    if (!this.gameForm.valid) {
      console.log("Invalid form");
    }

    var username: string = this.gameForm.value.username;
    var gameCode: string = this.gameForm.value.gameCode;

    // Register player
    this.apiService.registerPlayer(username, gameCode).then((success: boolean) => {
      if (!success) {
        alert('Username already taken');
        return;
      }

      // Redirect to game
      window.location.href = `/game/${gameCode}`;
    });
  }
}
