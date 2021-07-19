export interface IstateModel{
    statusCode:number;
    succeeded:boolean;
    message:string;
    errorMessage: string;
    result:resultState;
  }
  export interface resultState{
    hasNext:boolean;
    hasPrevious:boolean;
    isFirst:boolean;
    isLast:boolean;
    page:number;
    perPage:number;
    totalItems:number;
    totalPages:number;
    list:_Istate;
  }
  export interface _Istate{
    id_estado:number;
    id_pais:number;
    iso:string;
    estado:string;
  }
