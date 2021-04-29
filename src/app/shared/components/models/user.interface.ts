import { Token } from "@angular/compiler/src/ml_parser/lexer";

export type Roles= 'MEDICO'|'ADMIN';
export interface User{
  cedula:string;
  password:string;

}

export interface UserResponse  {
 statusCode:number;
 succeeded:boolean;
 message:string;
 result:LoginResponse;
}

export interface LoginResponse{
  token:string;
}


