import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/core/models/User/IUser';


@Component({
  selector: 'app-update-users-information',
  templateUrl: './update-users-information.component.html',
  styleUrls: ['./update-users-information.component.scss'],
  standalone: false,
})
export class UpdateUsersInformationComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  /**
   * Inicializa el formulario con validaciones
   */
  private initForm() {
    this.userForm = this.fb.group({
      id: [{ value: '', disabled: true }], // Deshabilitado porque el ID no se edita
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      nickname: [''],
      gender: [''],
      birth: [''],
      phones:['', [Validators.required, Validators.minLength(8)]],
      nit: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[0-9]+$')]] // Solo números
    });
  }

  /**
   * Guarda la información del usuario
   */
  onSave() {
    if (this.userForm.invalid) {
      Object.values(this.userForm.controls).forEach(control => control.markAsTouched());
      return;
    }

    const userData: IUser = this.userForm.getRawValue();
    console.log('Datos actualizados:', userData);
    // Aquí puedes enviar los datos al backend
  }
}
