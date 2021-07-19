export interface IspecialtiesModel{
  statusCode:number;
  succeeded:boolean;
  message:string;
  errorMessage: string;
  result:resultEspecialides;
}
export interface resultEspecialides{
  hasNext:boolean;
  hasPrevious:boolean;
  isFirst:boolean;
  isLast:boolean;
  page:number;
  perPage:number;
  totalItems:number;
  totalPages:number;
  list:_Iespecialidades;
}
export interface _Iespecialidades{
  id:number;
  especialidad:string;
  activo:boolean;
}
