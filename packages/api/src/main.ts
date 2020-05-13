import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from './core/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  await app.listen(configService.PORT, configService.BASE_HOST);
}
bootstrap();
