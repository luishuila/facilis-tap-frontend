// ─────────────────────────────────────────────────────────────
// MODELO DE USUARIO COMPLETO PARA IONIC (FRONTEND)
// Basado en los DTOs del backend y la estructura que ya usas.
// ─────────────────────────────────────────────────────────────

import { GenderEnum } from "../../constant/enum";


// ─────────────────────────────────────────────
// BASE - Común para todos los modelos de usuario
// ─────────────────────────────────────────────

export interface BaseUserModel {
  name: string;
  lastname: string;
  email: string;
  birth: Date;
  gender: GenderEnum;
}

export class BaseUser implements BaseUserModel {
  name: string = '';
  lastname: string = '';
  email: string = '';
  birth: Date = new Date();
  gender: GenderEnum = GenderEnum.OTHER;

  constructor(data: Partial<BaseUserModel> = {}) {
    Object.assign(this, data);
  }
}

// ─────────────────────────────────────────────
// CREACIÓN DE USUARIO (REGISTRO)
// ─────────────────────────────────────────────

export interface IUser extends BaseUserModel {
  password: string;
}

export class User extends BaseUser implements IUser {
  password: string = '';

  constructor(data: Partial<IUser> = {}) {
    super(data);
    this.password = data.password || '';
  }
}


// ─────────────────────────────────────────────
// ACTUALIZACIÓN DE USUARIO
// ─────────────────────────────────────────────

export interface UserUpdateI extends BaseUserModel {
  nickname?: string;
  nit?: number | null;
  phones?: string;
  username?: string;
}

export class UserUpdate extends BaseUser implements UserUpdateI {
  nickname?: string = '';
  nit?: number | null = null;
  phones?: string = '';
  username?: string = '';

  constructor(data: Partial<UserUpdateI> = {}) {
    super(data);
    this.nit = data.nit !== undefined ? Number(data.nit) || null : null;
    Object.assign(this, data);
  }
}


// ─────────────────────────────────────────────
// DTO USUARIO - PARA RESPUESTAS DEL BACKEND
// ─────────────────────────────────────────────

export class UserDto implements BaseUserModel {
  id!: string;
  name!: string;
  lastname!: string;
  email!: string;
  birth!: Date;
  gender!: GenderEnum;

  username!: string;
  nickname?: string;
  nit?: number;
  phones!: string;
  appointments?: any;
  roles?: any;
  providers?: any;
  employees?: any;
  addresses?: any;
  reviews?: any;
  img?: string;
  uiid?: string;

  constructor(data: Partial<UserDto> = {}) {
    Object.assign(this, data);
  }
}


// ─────────────────────────────────────────────
// USUARIO DE SESIÓN (AUTENTICADO)
// ─────────────────────────────────────────────

export interface UserSession {
  id: string;
  name: string;
  lastname: string;
  username: string;
  uiid: string;
  img: string;
  roles: any;
}
