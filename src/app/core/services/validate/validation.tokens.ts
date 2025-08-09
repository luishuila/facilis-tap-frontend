import { InjectionToken } from '@angular/core';

export type ErrorMessagesMap = Record<string, (e?: any) => string>;

export const DEFAULT_ERROR_MESSAGES: ErrorMessagesMap = {
  required: () => 'Este campo es obligatorio',
  minlength: (e) => `Debe tener al menos ${e?.requiredLength} caracteres`,
  maxlength: (e) => `Debe tener máximo ${e?.requiredLength} caracteres`,
  email: () => 'Correo electrónico inválido',
  pattern: () => 'Formato inválido',
  passwordMismatch: () => 'Las contraseñas no coinciden',
};

export const ERROR_MESSAGES = new InjectionToken<ErrorMessagesMap>('ERROR_MESSAGES', {
  factory: () => DEFAULT_ERROR_MESSAGES,
});
