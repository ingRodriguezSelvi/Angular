import { UsersTable } from "../lib/datatable";

export interface IusersModel{
  statusCode:number;
  succeeded:boolean;
  message:string;
  errorMessage: string;
  result:resultSUsers;
}
export interface resultSUsers{
  hasNext:boolean;
  hasPrevious:boolean;
  isFirst:boolean;
  isLast:boolean;
  page:number;
  perPage:number;
  totalItems:number;
  totalPages:number;
  list:usersModel;
}
export interface usersModel {

  //usuario: {
    id?: number | null
    nombres: string | null
    apellidos: string | null
    sexo: string | null
    direccion: string | null
    pre_rif: string | null
    rif: string | null
    tipo:  string | null
    telefonos: string | null
    email: string | null
    status: number | null
    usuario_ins: string | null
    fecha_ins?: Date | null
  // },
  // username: string;
  // password: string;
     rol: string;
}





export interface IuserModel{
  Message: string;
  statusCode:number;
  succeeded:boolean;
  message:string;
  errorMessage: string;
  result:resultUsers;
}
export interface resultUsers{
  hasNext:boolean;
  hasPrevious:boolean;
  isFirst:boolean;
  isLast:boolean;
  page:number;
  perPage:number;
  totalItems:number;
  totalPages:number;
  list:UserModel;
}


export interface UserModel extends UsersTable{

  usuario: UsersTable
  username: string | null
  password: string | null
  rol: string | null
}



export interface IuserspModel{
  statusCode:number;
  succeeded:boolean;
  message:string;
  errorMessage: string;
  result:resultSpUsers;
}
export interface resultSpUsers{
  hasNext:boolean;
  hasPrevious:boolean;
  isFirst:boolean;
  isLast:boolean;
  page:number;
  perPage:number;
  totalItems:number;
  totalPages:number;
  list:userspModel;
}
export interface userspModel {

  cedula:string | null;
  contrasena: string | null;
}



