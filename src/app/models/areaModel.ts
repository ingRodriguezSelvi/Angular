export interface IAreaModel{
    statusCode:number;
    succeeded:boolean;
    message:string;
    errorMessage: string;
    result:resultArea;
  }
  export interface resultArea{
    hasNext:boolean;
    hasPrevious:boolean;
    isFirst:boolean;
    isLast:boolean;
    page:number;
    perPage:number;
    totalItems:number;
    totalPages:number;
    list:AreaModel;
  }
  export interface AreaModel {
    id?: number;
    nombre: string | null;
    status: string | null;
    usuario_ins: string | null;
    fecha_ins?: Date | null
  }
