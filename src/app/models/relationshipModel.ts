export interface IrelationshipModel{
    statusCode:number;
    succeeded:boolean;
    message:string;
    errorMessage: string;
    result:resultRelationship;
  }
  export interface resultRelationship{
    hasNext:boolean;
    hasPrevious:boolean;
    isFirst:boolean;
    isLast:boolean;
    page:number;
    perPage:number;
    totalItems:number;
    totalPages:number;
    list:_Irelationship;
  }
  export interface _Irelationship{
    id?:number;
    nombre:string;
    status:boolean;
  }
