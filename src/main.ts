import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(ConfigService);
  const openApiConfig = new DocumentBuilder()
    .setTitle('Class Attendance API')
    .setDescription('Class Attendance Service API')
    .setVersion('1.0')
    .addTag('school university attendance')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('api', app, documentFactory);

  const port = appConfig.get<number>('port')
  await app.listen(port ?? 3000);
}
bootstrap();
