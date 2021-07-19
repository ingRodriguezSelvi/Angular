export interface IcountryModel{
    statusCode:number;
    succeeded:boolean;
    message:string;
    errorMessage: string;
    result:resultCountry;
  }
  export interface resultCountry{
    hasNext:boolean;
    hasPrevious:boolean;
    isFirst:boolean;
    isLast:boolean;
    page:number;
    perPage:number;
    totalItems:number;
    totalPages:number;
    list:_Icountry;
  }
  export interface _Icountry{
    id_pais:number;
    iso:string;
    nombre:string;
  }
