export interface IinsiranceModel {
  statusCode: number;
  succeeded: boolean;
  message: string;
  errorMessage:string;
  result: resultInsirance;
}
export interface resultInsirance {
  hasNext: boolean;
  hasPrevious: boolean;
  isFirst: boolean;
  isLast: boolean;
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  list: _Iinsirance;
}
export interface _Iinsirance {
  Id?: number;
  razon_social: string;
  Tipo_seguro: string;
  Tipo_institucion: string;
  Pre_rif: string;
  Rif: string;
  //Pais: number;
  // Estado: number;
  // Municipio: number;
  // Ciudad: number;
  Telefonos: string;
  Email: string;
  Direccion: string;
  Nombre_contacto: string;
  Apellido_contacto: string;
  Email_contacto: string;
  Telefonos_contacto: string;
  Usuario_ins: number;
  Fecha_ins: Date;
  Status: number;

}
