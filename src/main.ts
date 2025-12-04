import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: [configService.get<string>('FRONTEND_URL')], // Ionic dev server
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api/v1', {
    exclude: ['/swagger'],
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Vondel API')
    .setDescription('API documentation for Vondel project')
    .setVersion('1.0')
    .addBearerAuth() // Optional if using JWT auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(configService.get<number>('PORT') || 3000);

  console.log(`🚀 Server running on http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`🦢 Swagger UI: http://localhost:${process.env.PORT ?? 3000}/swagger`);

}
bootstrap();
