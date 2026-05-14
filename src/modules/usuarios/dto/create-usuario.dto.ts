import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator"

export class CreateUsuarioDto {

  @IsString({message:'El nombre es un texto'})
  @IsNotEmpty({message:'El nombre es obligatorio'})
  nombre!: string

  @IsString({message:'El o los apellidos son texto'})
  @IsNotEmpty({message:'Al menos se requiere un apellido'})
  apellidos!: string
  
  @IsNumber({},{message:'Edad es un numero'})
  @IsNotEmpty({message:'La edad obligatoria'})
  @Min(1,{message:'La edad minima es cero'})
  edad!: number
  
  @IsString({message:'El ci es un texto'})
  @IsNotEmpty({message:'El ci es obligatorio'})
  ci!: string
  
  @IsString({message:'El email es un texto'})
  @IsEmail({},{message:'El email no es valido'})
  @IsNotEmpty({message:'El email es obligatorio'})
  email!: string
  
  @IsString({message:'La password es un texto'})
  @IsNotEmpty({message:'La password es obligatoria'})
  @MinLength(8,{message:'La password tiene que tener mas de 8 caracteres'})
  password!: string
  
  @IsString({message:'El telefono es un texto'})
  @IsOptional()
  telefono?: string
}
