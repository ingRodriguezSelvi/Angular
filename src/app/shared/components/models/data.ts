export interface Medicos{

  nombre:string;
  apellido:string;
  cedula:string;
  numerosDocum:number[]

}

export interface Cobros extends Medicos{

  fechaEmision:string;
  fechaCancelacion:string;
  numeroDocum:number;
  nombrePaciente:string
  apellidoPaciente:string;
  montoHonorario:number;

}

export interface Monedas{
  dolar:number;
  bolivar:number;
}
