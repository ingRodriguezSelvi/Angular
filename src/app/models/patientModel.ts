export interface IpatientModel{
    statusCode:number;
    succeeded:boolean;
    message:string;
    errorMessage: string;
    result:resultPatient;
  }
  export interface resultPatient{
    hasNext:boolean;
    hasPrevious:boolean;
    isFirst:boolean;
    isLast:boolean;
    page:number;
    perPage:number;
    totalItems:number;
    totalPages:number;
    list:_Ipatient;
  }
  export interface _Ipatient{
    id?: number,
    nro_historia: string,
    nombres: string,
    apellidos: string,
    full_name: string,
    lugar_nacimiento: string,
    fecha_nacimiento: Date,
    sexo: string,
    direccion: string,
    pais:string,
    estado:string,
    ciudad: number,
    municipio: number,
    zona: string,
    pre_cedula: string,
    cedula: string,
    ocupacion: string,
    telefonos: string,
    email: string,
    educacion: number,
    estado_civil: number,
    seguro: number,
    responsable?: number,
    parentesco?: number,
    nombre_emer: string,
    apellidos_emer: string,
    telefonos_emer: string,
    parentesco_emer: number,
    direccion_emer: string,
    usuario_ins: number,
    fecha_ins: Date,
    status: number
  }

