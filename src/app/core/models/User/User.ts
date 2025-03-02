import { IUser } from './IUser';

export class User implements IUser {
  name: string;
  lastname: string;
  email: string;
  password: string;
  birth: string;
  gender: 'Male' | 'Female' | 'Other';

  constructor(data: Partial<IUser> = {}) {
    this.name = data.name || '';
    this.lastname = data.lastname || '';
    this.email = data.email || '';
    this.password = data.password || '';
    this.birth = data.birth || '';
    this.gender = data.gender || 'Other';
  }

  toJson(): IUser {
    return {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      birth: this.birth,
      gender: this.gender
    };
  }
}
