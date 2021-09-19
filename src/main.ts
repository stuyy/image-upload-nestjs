import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3001;
  app.enableCors({ origin: ['http://localhost:3000'] });
  app.setGlobalPrefix('api');
  await app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
}

bootstrap();
