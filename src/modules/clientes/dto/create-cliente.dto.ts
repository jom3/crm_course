import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateClienteDto {

  @IsString({ message: 'El nombre es un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre!: string

  @IsString({ message: 'El apodo es un texto' })
  @IsNotEmpty({ message: 'El apodo es obligatorio' })
  apodo!: string

  @IsString({ message: 'El email es un texto' })
  @IsEmail({}, { message: 'El email no es valido' })
  @IsOptional()
  email?: string

  @IsString({ message: 'El telefono es un texto' })
  @IsNotEmpty({ message: 'El telefono es requerido' })
  telefono!: string
}
