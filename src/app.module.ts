import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buku } from './entities/buku.entity';
import { Member } from './entities/member.entity';
import { BukuService } from './buku.service';
import { BukuSeed } from './buku.seed';
import { MemberSeed } from './member.seed';
import { BookController, MemberController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'library.db',
      entities: [Buku, Member],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Buku, Member]),
  ],
  controllers: [BookController, MemberController],
  providers: [BukuService, BukuSeed, MemberSeed],
})
export class AppModule {}