export type Roles= 'MEDICO'|'ADMIN';
export interface User{
  cedula:string;
  password:string;

}

export interface UserResponse  {
 StatusCode:number;
 Succeded:boolean;
 Message:string;
 result:object;
}


