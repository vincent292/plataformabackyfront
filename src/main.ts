import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración correcta de CORS
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:8080'],
  });

  
  await app.listen(8000); 
}

bootstrap();
