import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginDto {

  @IsString({ message: 'El email es un texto' })
  @IsEmail({}, { message: 'El email no es valido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email!: string

  @IsString({ message: 'El password es un texto' })
  @IsNotEmpty({ message: 'El password es obligatorio' })
  password!: string
}