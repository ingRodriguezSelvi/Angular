export interface ImunicipalityModel{
    statusCode:number;
    succeeded:boolean;
    message:string;
    errorMessage: string;
    result:resultMunicipality;
  }
  export interface resultMunicipality{
    hasNext:boolean;
    hasPrevious:boolean;
    isFirst:boolean;
    isLast:boolean;
    page:number;
    perPage:number;
    totalItems:number;
    totalPages:number;
    list:_Imunicipality;
  }
  export interface _Imunicipality{
    id_municipio:number;
    id_estado:number;
    municipio:string;
  }
