import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(app.get(ThrottlerGuard));
  const appConfig = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  const openApiConfig = new DocumentBuilder()
  .setTitle('Class Attendance API')
  .setDescription('Class Attendance Service API')
  .setVersion('1.0')
  .addTag('school university attendance')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization',
    },
    'bearer',
  )
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('api', app, documentFactory);

  const port = appConfig.get<number>('port')
  await app.listen(port ?? 3000);
}
bootstrap();
