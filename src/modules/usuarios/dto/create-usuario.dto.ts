import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator"

export class CreateUsuarioDto {

  @ApiProperty({name:'nombre', title:'nombre', example:'Juan', description:'Campo donde se ingresa el nombre o nombres de la persona', required:true})
  @IsString({message:'El nombre es un texto'})
  @IsNotEmpty({message:'El nombre es obligatorio'})
  nombre!: string
  
  @ApiProperty({name:'apellidos', title:'apellidos', example:'Perez', description:'Campo donde se ingresa el apellido o los apellidos de la persona, al menos se requiere uno', required:true})
  @IsString({message:'El o los apellidos son texto'})
  @IsNotEmpty({message:'Al menos se requiere un apellido'})
  apellidos!: string
  
  @ApiProperty({name:'edad', title:'edad', example:40, description:'Campo donde se ingresa la edad de la persona', required:true})
  @IsNumber({},{message:'Edad es un numero'})
  @IsNotEmpty({message:'La edad obligatoria'})
  @Min(1,{message:'La edad minima es cero'})
  edad!: number
  
  @ApiProperty({name:'ci', title:'ci', example:'68686815tj', description:'Campo donde se ingresa la cedula de identidad de la persona', required:true})
  @IsString({message:'El ci es un texto'})
  @IsNotEmpty({message:'El ci es obligatorio'})
  ci!: string
  
  @ApiProperty({name:'email', title:'email', example:'juan.perez@gmail.com', description:'Campo donde se ingresa el correo electronico de la persona', required:true})
  @IsString({message:'El email es un texto'})
  @IsEmail({},{message:'El email no es valido'})
  @IsNotEmpty({message:'El email es obligatorio'})
  email!: string
  
  @ApiProperty({name:'password', title:'password', example:'tuCl4veS3cret4', description:'Campo donde se ingresa la contraseña de la persona', required:true})
  @IsString({message:'La password es un texto'})
  @IsNotEmpty({message:'La password es obligatoria'})
  @MinLength(8,{message:'La password tiene que tener mas de 8 caracteres'})
  password!: string
  
  @ApiProperty({name:'telefono', title:'telefono', example:'68686815', description:'Campo donde se ingresa el numero telefonico de la persona'})
  @IsString({message:'El telefono es un texto'})
  @IsOptional()
  telefono?: string
}
