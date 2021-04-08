export type Roles= 'MEDICO'|'ADMIN';
export interface User{
  cedula:string;
  password:string;

}

export interface UserResponse{
 statuscode:number,
 succeeded:boolean,
 message:string,
 result:object
}


