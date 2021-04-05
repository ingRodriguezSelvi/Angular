export type Roles= 'MEDICO'|'ADMIN';
export interface User{
  usarname:string;
  password:string;
}

export interface UserResponse{
  message:string;
  token:string;
  userId:number;
  role:Roles
}
