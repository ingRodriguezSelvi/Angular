export interface IedocivilModel{
    statusCode:number;
    succeeded:boolean;
    message:string;
    errorMessage: string;
    result:resultEdoCivil;
  }
  export interface resultEdoCivil{
    hasNext:boolean;
    hasPrevious:boolean;
    isFirst:boolean;
    isLast:boolean;
    page:number;
    perPage:number;
    totalItems:number;
    totalPages:number;
    list:_Iedocivil;
  }
  export interface _Iedocivil{
    id_civil:number;
    nombre:string;
  }
