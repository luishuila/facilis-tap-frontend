import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenderEnum } from 'src/app/core/constant/enum';

@Component({
  selector: 'app-update-users-information',
  templateUrl: './update-users-information.component.html',
  styleUrls: ['./update-users-information.component.scss'],
  standalone: false,
})
export class UpdateUsersInformationComponent implements OnInit {

  @Input() userForm!: FormGroup;
  @Input() genderOptions: {label:string,value:GenderEnum }[]  = []
  @Input() isDisabled: boolean = false;
  ngOnInit(): void {
    console.log('userForm', this.userForm)
  }
   
  @Output() userSaved = new EventEmitter<any>();

  onSave() {
    this.userSaved.emit(this.userForm.value);
  }
}
