export interface ForgotPass{
  statusCode:number;
  succeeded:boolean;
  message:string;
  result:{
    cedula:string;
  }
}
export interface UserForgotPass{
  cedula:string;
}
export interface ResponseCode{
  statusCode:number;
  succeeded:boolean;
  message:string;
  result:{
    cedula?:string;
    codigo?:string;
    token?:string;
    rol?:string;
  }
}
export interface UserCode{
  cedula:string
  codigo:string
}
export interface ResponseAsignarPass{
  statusCode:number;
  succeeded:boolean;
  message:string;
  result: {
    cedula?:string;
    contrasena?:string;
  }
}
export interface AsignarPass{
  cedula:string;
  contrasena:string;
}
