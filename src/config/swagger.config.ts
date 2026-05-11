import { DocumentBuilder } from "@nestjs/swagger";

export const SwaggerConfig = new DocumentBuilder()
  .setTitle('Plataforma de atencion al cliente')
  .setDescription('Con esta aplicacion vamos a atender a nuestros pacientes y otros')
  .setVersion('1.0')
  .addTag('CRM')
  .build();