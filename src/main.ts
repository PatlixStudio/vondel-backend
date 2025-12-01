import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Vondel API')
    .setDescription('API documentation for Vondel project')
    .setVersion('1.0')
    .addBearerAuth() // Optional if using JWT auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);

  console.log(`🚀 Server running on http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`🦢 Swagger UI: http://localhost:${process.env.PORT ?? 3000}/api`);
  
}
bootstrap();
