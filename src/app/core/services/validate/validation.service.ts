import { Inject, Injectable } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { ERROR_MESSAGES, ErrorMessagesMap } from '../validate/validation.tokens';

@Injectable({ providedIn: 'root' })
export class ValidationService {
  constructor(@Inject(ERROR_MESSAGES) private messages: ErrorMessagesMap) {}

  // Verifica si hay errores en el campo y si fue tocado o modificado
  hasError(container: ControlContainer, controlName: string): boolean {
    const ctrl = (container.control as FormGroup)?.get(controlName);
    if (!ctrl) return false;
    return (ctrl.touched || ctrl.dirty) && !!ctrl.errors;
  }

  // Obtiene el mensaje de error según el tipo de error en el control
  getErrorMessage(container: ControlContainer, controlName: string): string {
    const ctrl = (container.control as FormGroup)?.get(controlName);
    if (!ctrl || !ctrl.errors) return '';
    
    const priority = ['required', 'minlength', 'maxlength', 'email', 'pattern', 'passwordMismatch'];
    const keys = Object.keys(ctrl.errors);
    const key = priority.find(p => keys.includes(p)) ?? keys[0];
    
    const resolver = this.messages[key];
    return resolver ? resolver(ctrl.errors[key]) : 'Revisa este campo';
  }
}
