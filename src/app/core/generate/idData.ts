import { roleEnum } from "../constant/enum";


export let idUsers:string = '' 
export let idUuid:string = '' 
export interface User {
    id: string; 
    name: string;
    roles: Role[];
    uiid: string;
    username: string;
    validateRoles: (role: roleEnum) => boolean;
  }
  
export interface Role {
    name: string;
    idRol: number;
    role: string;
  }
 
  export const usersData = function(): User {
    const storedUser:User = JSON.parse( localStorage.getItem('users') ||'');
    
    if (storedUser) {
        idUsers = storedUser.id;
        idUuid = storedUser.uiid;
    }
    
    storedUser.validateRoles = (role:roleEnum)=>{
      return   storedUser.roles.some(r => r.role === role)
    }
    return storedUser;
  }


