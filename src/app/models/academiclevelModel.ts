export interface IacademiclevelModel{
    statusCode:number;
    succeeded:boolean;
    message:string;
    errorMessage: string;
    result:resultAcademiclevel;
  }
  export interface resultAcademiclevel{
    hasNext:boolean;
    hasPrevious:boolean;
    isFirst:boolean;
    isLast:boolean;
    page:number;
    perPage:number;
    totalItems:number;
    totalPages:number;
    list:_Iacademiclevel;
  }
  export interface _Iacademiclevel{
    id:number;
    nombre:string;
    status:boolean;
  }
