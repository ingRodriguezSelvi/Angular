export interface Medicos{

  id:number
  nombres:string;
  apellidos:string;
  rif:string;
  exId:string;

}

export interface MedicosI extends Medicos{

  email:string;
  celular:number;
  zona:string;
  sexo:string;
  ciudad:string;

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
}

export interface Monedas{
  dolar:number;
  bolivar:number;
}
export interface OrdenMedica {
  ordernum:number;
  fechaEmis:string;
  monto:number;
  montodol:number;
}

export interface PaymentsDetailsI{
  numero:number;
  nombre:string,
  fecha:string;
  montoBs:number;
  montoDol:number;
}

export interface EspecialidadI{
  id:number;
  especialidad:string;
}


