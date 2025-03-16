import { GenderEnum } from "../../constant/enum";
import { AddressDtoI } from "../address/AddressI";
import { BaseUserModel } from "./BaseUserModel";


export interface IUser   extends BaseUserModel {
    password: string;
}
  export interface UserDto  extends BaseUserModel {
    id: string;
    username: string;
    nickname?: string;
    nit: number;
    provider?: any[];
    addresses?: AddressDtoI[];
    appointments?: any[];
    employees?: any[];
    roles: any[];
    providers: any[];
    phones:string;
  }
  export interface UserUpdateI extends BaseUserModel  {
    nickname?: string;    
    nit?:  number | null ;       
    phones?: string;      
    username?: string;   
  }

  // export interface UserDto {
  //   id: string;
  //   name: string;
  //   lastname: string;
  //   username: string;
  //   email: string;
  //   nickname?: string;
  //   gender?:  GenderEnum;
  //   birth?: Date;
  //   nit: number;
  //   // provider?: any[];
  //   // addresses?: AddressDto[];
  //   // appointments?: any[];
  //   // employees?: any[];
  //   // roles: any[];
  //   // providers: any[];
  //   phones:string;
  // }




  