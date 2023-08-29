import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent {
  public gameForm: FormGroup = new FormGroup({
    playerName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z0-9]*$'),
    ]),
    gameCode: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      Validators.pattern('^[a-zA-Z0-9]*$'),
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
  ) { }

  public submit(): void {
    if (this.gameForm.valid) {
      
    }
  }
}
