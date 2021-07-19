export interface AcademiclevelTable{
    id:number;
    nombre:string;
    status:boolean;
  }
  export interface EdocivilTable{
    id_civil:number;
    nombre:string;
  }
  export interface CountryTable{
    id_pais:number;
    iso:string;
    nombre:string;
  }
  export interface CitiesTable{
    id_ciudad:number;
    id_estado:number;
    ciudad:string;
    capital: boolean;
  }
  export interface InsiranceTable {
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

  export interface EspecialidadesTable{
    id:number;
    especialidad:string;
    activo:boolean;
  }
  export interface MunicipalityTable{
    id_municipio:number;
    id_estado:number;
    municipio:string;
  }

  export interface RelationshipTable{
    id?:number;
    nombre:string;
    status:boolean;
  }

  export interface StateTable{
    id_estado:number;
    id_pais:number;
    iso:string;
    estado:string;
  }
  export interface PatientTable{
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

export interface UsersTable {
  id?: string | null
  nombres: string | null
  apellidos: string | null
  sexo: string | null
  direccion: string | null
  pre_rif: string | null
  rif: string | null
  tipo: string | null
  telefonos: string
  email: string | null
  status?: number | null
  usuario_ins: number|null,
  fecha_ins?: Date | null
}

