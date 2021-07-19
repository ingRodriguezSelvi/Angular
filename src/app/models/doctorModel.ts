export interface IdoctorModel{
    statusCode:number;
    succeeded:boolean;
    message:string;
    errorMessage: string;
    result:resultDoctor;
  }
  export interface resultDoctor{
    hasNext:boolean;
    hasPrevious:boolean;
    isFirst:boolean;
    isLast:boolean;
    page:number;
    perPage:number;
    totalItems:number;
    totalPages:number;
    list:_Idoctor;
  }
  export interface _Idoctor{
    id:number;
    especialidad:string;
    activo:boolean;
    Historia:string;
    cedula:string;
    nombre:string;
    telefono:string;
  }
