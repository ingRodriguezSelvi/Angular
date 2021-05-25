export interface IMedFull{
    id:number;
    extId:string;
    nombres:string;
    apellidos:string;
    full_Name:string;
    rif: string;
    direccion: string;
    email: string;
    celular:string;
    sexo:string;
    zona:string;
    ciudad:string;
    especialidad:number;
    activo:boolean;
}
export interface IMedUp{
  medico:IMedFull;
  contrato:Boolean;
  cortesia:Boolean;
}
