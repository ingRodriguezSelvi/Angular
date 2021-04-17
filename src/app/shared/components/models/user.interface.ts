import { Token } from "@angular/compiler/src/ml_parser/lexer";

export type Roles= 'MEDICO'|'ADMIN';
export interface User{
  cedula:string;
  password:string;

}

export interface UserResponse  {
 StatusCode:number;
 Succeded:boolean;
 Message:string;
 result:LoginResponse;
}

export interface LoginResponse{
  token:string;
}


