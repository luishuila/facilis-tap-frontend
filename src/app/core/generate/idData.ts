

export let idUsers:string = '' 
export interface User {
    id: string; 
    name: string;
    roles: Role[];
    uuid: string;
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
    }
    return storedUser;
  }


