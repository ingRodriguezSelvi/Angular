export interface Medicos{

  id:number;
  nombres:string;
  apellidos:string;
  rif:string;
}

export interface MedicosI extends Medicos{

  email:string;
  celular:number;
  zona:string;
  sexo:string;
  ciudad:string;
  direccion:string
}
export interface F_MedicosI extends MedicosI{
  full_Name:string;
  extId:string;
  especialidad?:number
  activo:boolean;
}

export interface Promotion{
  id:number;
  imageUrl:string;
  title:string;
  content:string;
  link:string;
}
export interface Cobros {
  numero:number;
  fecha:Date;
  montoBs:number;
  montoDol:number;
  numero_Fact:number;
  nombre:string;
  fecha_Fact:Date;
  monto_Bruto_Bs:number;
  monto_Bruto_Dol:number;
  factura?:number;
}

export interface Monedas{
  dolar:number;
  bolivar:number;
}
export interface OrdenMedica {
  numero:number;
  fecha:Date;
  factura:string;
  montoBs:number;
  montoDol:number;
  paciente:string;
  cuantas:number;
}
export interface RegisterMedI{
  medico:F_MedicosI;
  username:string;
  password:string;
  contrato:boolean;
  cortesia:boolean
}

export interface PaymentsDetailsI{
  numero:number;
  nombre:string,
  fecha:string;
  montoBs:number;
  montoDol:number;
  monto_Neto_Bs:number;
  monto_Neto_Dol:number;
  monto_Comis_Bs:number;
  monto_Comis_Dol:number;
  porc_Comis:number;
}

export interface DesactiveMedResponseI{
id:number;
enable:boolean;
}

export interface EspecialidadI{
  id:number;
  especialidad:string;
}
export interface Sedes{
  id:number;
  nombre:string;
}
export interface Meses{
  id:number;
  nombre:string;
}
export interface HonoXPagar{
  numero:number;
  fecha:Date;
  montoBs:number;
  montoDol:number;
  nombre:string;
}
