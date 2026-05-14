import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    PrismaModule,
    UsuariosModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
