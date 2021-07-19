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
  rol:string;
  nombre?:string;
  apellido?:string;
  full_name?:string;
}
