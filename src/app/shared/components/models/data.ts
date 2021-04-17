export interface Medicos{

  id:number;
  nombre:string;
  rif:string;
  codigo:string;

}

export interface Cobros {
  numero:number;
  fecha:Date;
  montoBs:number;
  montoDol:number;
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
