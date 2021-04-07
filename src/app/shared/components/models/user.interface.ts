export type Roles= 'MEDICO'|'ADMIN';
export interface User{
  username:string;
  password:string;
  rememberMe:boolean;
}

export interface UserResponse{
 statuscode:number,
 succeeded:boolean,
 message:string,
 result:object
}
