import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SeedService } from './seed.service';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seed = app.get(SeedService);
  const result = seed.run();
  // eslint-disable-next-line no-console
  console.log('Seed result', result);
  await app.close();
}

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
