import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MemberSeed } from './member.seed';
import { BukuSeed } from './buku.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const bukuSeedRepository = app.get(BukuSeed);
  const memberSeedRepository = app.get(MemberSeed);
  await bukuSeedRepository.seed();
  await memberSeedRepository.seed();
  await app.listen(3000);
}
bootstrap();
