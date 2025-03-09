
import { BaseUser } from './BaseUserModel';
import { IUser, UserUpdateI } from './IUser';




export class User extends BaseUser implements IUser {
  password: string = '';
  constructor(data: Partial<IUser> = {}) {
    super();  
    Object.assign(this, data); 
    this.password = data.password || '';
  }
}


export class UserUpdate extends BaseUser implements UserUpdateI {
  nickname?: string = '';
  nit?: number | null = null;
  phones?: string = '';
  username?: string = '';
  constructor(data: Partial<UserUpdateI> = {}) {
    super();
    this.nit = data.nit !== undefined ? Number(data.nit) || null : null;
    Object.assign(this, data);
  }
}
