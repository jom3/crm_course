import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './config/swagger.config';
import { WinstonConfig } from './config/winston.config';

async function bootstrap() {
  try {
    const port = process.env.PORT ?? 3000;

    const app = await NestFactory.create(AppModule, {
      logger: WinstonConfig
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      })
    );

    app.setGlobalPrefix('api');
    app.enableCors();

    const documentFactory = () => SwaggerModule.createDocument(app, SwaggerConfig);
    SwaggerModule.setup('docs', app, documentFactory);

    await app.listen(port);
    Logger.log(`Servidor corriendo en el puerto: ${port}`)
  } catch (error) {
    Logger.error(error)
  }
}

void bootstrap();
