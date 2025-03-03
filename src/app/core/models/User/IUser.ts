export interface IUser {
    name: string;
    lastname: string;
    email: string;
    password: string;
    birth: string; 
    gender: 'Male' | 'Female' | 'Other';
  }
  export interface UserDto {
    id: string;
    name: string;
    lastname: string;
    username: string;
    email: string;
    nickname?: string;
    gender?:  'Male' | 'Female' | 'Other';
    birth?: Date;
    nit: number;
    provider?: any[];
    addresses?: any[];
    appointments?: any[];
    employees?: any[];
    roles: any[];
    providers: any[];
    phones:string;
  }