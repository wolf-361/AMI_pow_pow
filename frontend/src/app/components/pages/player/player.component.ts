import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  public hostForm: FormGroup = new FormGroup({
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
    return this.hostForm.controls;
  }

  constructor() {}

  public onSubmit(): void {
    if (this.hostForm.invalid) {
      return;
    }

    console.log(this.hostForm.value);
  }
}
