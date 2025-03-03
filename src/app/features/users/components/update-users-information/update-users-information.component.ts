import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-users-information',
  templateUrl: './update-users-information.component.html',
  styleUrls: ['./update-users-information.component.scss'],
  standalone: false,
})
export class UpdateUsersInformationComponent {
  
  @Input() userForm!: FormGroup;
  @Input() genderOptions: { label: string; value: string }[] = [
    { label: 'Masculino', value: 'Male' },
    { label: 'Femenino', value: 'Female' },
    { label: 'Otro', value: 'Other' }
  ];
  
  @Output() userSaved = new EventEmitter<any>();

  onSave() {
    if (this.userForm.invalid) {
      Object.values(this.userForm.controls).forEach(control => control.markAsTouched());
      return;
    }
    this.userSaved.emit(this.userForm.value);
  }
}
