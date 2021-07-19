export interface IcitiesModel{
    statusCode:number;
    succeeded:boolean;
    message:string;
    errorMessage: string;
    result:resultCities;
  }
  export interface resultCities{
    hasNext:boolean;
    hasPrevious:boolean;
    isFirst:boolean;
    isLast:boolean;
    page:number;
    perPage:number;
    totalItems:number;
    totalPages:number;
    list:_Icities;
  }
  export interface _Icities{
    id_ciudad:number;
    id_estado:number;
    ciudad:string;
    capital: boolean;
  }
