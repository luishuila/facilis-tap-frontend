

export let idUsers:string = '' 
export let idUuid:string = '' 
export interface User {
    id: string; 
    name: string;
    roles: Role[];
    uiid: string;
    username: string;
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
    return storedUser;
  }


