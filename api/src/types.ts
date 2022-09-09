import { ObjectId } from "mongoose";

export enum UserRoles {
  SuperAdmin = "superadmin",
  Admin = "admin",
  User = "user",
}

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRoles;
};

export type Token = {
  userId: ObjectId;
  token: string;
  createdAt: Date;
};

export enum Sexo {
  Hombre = "h",
  Mujer = "m",
}

export enum EstadoCivil {
  Soltero = "s",
  Casado = "c",
  Viudo = "v",
  Divorciado = "d",
  SinPareja = "sp",
}

export type SolicitudModelosGeneralesEX00 = {
  pasaporteExtrangero: string;
  NIEExtrangero: string;
  primerApellidoExtrangero: string;
  segundoApellidoExtrangero: string;
  nombreExtrangero: string;
  fechaNacimientoExtrangero: string;
  lugarNacimientoExtrangero: string;
  paisExtrangero: string;
  sexoExtrangero: Sexo;
  nacionalidadExtrangero: string;
  estadoCivilExtrangero: EstadoCivil;
  nombrePadreExtrangero: string;
  nombreMadreExtrangero: string;
  domicilioEspanaExtrangero: string;
  numeroDomicilioEspanaExtrangero: string;
  pisoDomicilioEspanaExtrangero: string;
  localidadExtrangero: string;
  codigoPostalExtrangero: string;
  provinciaExtrangero: string;
  telefonoMobilExtrangero: string;
  emailExtrangero: string;
  representanteLegalExtrangero: string;
  DNINIEPASRepresentanteLegalExtrangero: string;
  tituloRepresentanteLegalExtrangero: string;
  nombreRazonSocialRepresentante: string;
  DNINIEPASRepresentante: string;
  domicilioEspanaRepresentante: string;
  numeroDomicilioEspanaRepresentante: string;
  pisoDomicilioEspanaRepresentante: string;
  localidadRepresentante: string;
  codigoPostalRepresentante: string;
  provinciaRepresentante: string;
  telefonoMobilRepresentante: string;
  emailRepresentante: string;
  representanteLegalRepresentante: string;
  DNINIEPASRepresentanteLegalRepresentante: string;
  tituloRepresentanteLegalRepresentante: string;
  nombreRazonSocialDomicilio: string;
  DNINIEPASDomicilio: string;
  domicilioEspanaDomicilio: string;
  numeroDomicilioEspanaDomicilio: string;
  pisoDomicilioEspanaDomicilio: string;
  localidadDomicilio: string;
  codigoPostalDomicilio: string;
  provinciaDomicilio: string;
  telefonoMobilDomicilio: string;
  emailDomicilio: string;
};
