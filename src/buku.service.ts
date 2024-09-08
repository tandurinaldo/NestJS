import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buku } from 'src/entities/buku.entity';
import { Member } from 'src/entities/member.entity';
import { BukuSeed } from './buku.seed';
import { MemberSeed } from './member.seed';

@Injectable()
export class BukuService implements OnModuleInit {
  constructor(
    @InjectRepository(Buku)
    private bookRepository: Repository<Buku>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    @InjectRepository(BukuSeed)
    private bukuSeedRepository: Repository<BukuSeed>,
    @InjectRepository(MemberSeed)
    private memberSeedRepository: Repository<MemberSeed>,
    
  ) {}
  
  async borrowBook(bookCode: string, memberCode: string) {
    const book = await this.bookRepository.findOne({ where: { code: bookCode } });
    const member = await this.memberRepository.findOne({ where: { code: memberCode } });

    if (!book || book.stock <= book.minjam) {
      throw new Error('Buku saat ini tidak tersedia!');
    }

    if (!member || member.penalty || member.minjamBuku >= 2) {
      throw new Error('Anggota tidak memenuhi syarat meminjam buku!');
    }

    book.minjam += 1;
    member.minjamBuku += 1;

    await this.bookRepository.save(book);
    await this.memberRepository.save(member);

    return { message: 'Meminjam buku Berhasil!' };
  }

  async returnBook(bookCode: string, memberCode: string, daysBorrowed: number) {
    const book = await this.bookRepository.findOne({ where: { code: bookCode } });
    const member = await this.memberRepository.findOne({ where: { code: memberCode } });

    if (!book || !member) {
      throw new Error('Buku atau anggota tidak valid!');
    }

    if (daysBorrowed > 7) {
      member.penalty = true;
      const penaltyEndDate = new Date();
      penaltyEndDate.setDate(penaltyEndDate.getDate() + 3);
      member.penaltyEndDate = penaltyEndDate;
    }

    book.minjam -= 1;
    member.minjamBuku -= 1;

    await this.bookRepository.save(book);
    await this.memberRepository.save(member);

    return { message: 'Berhasil mengembalikan buku!' };
  }

  async checkBooks() {
    return await this.bookRepository.find();
  }

  async checkMembers() {
    return await this.memberRepository.find();
  }
  async onModuleInit() {
    await this.memberSeedRepository.seed();
    await this.bukuSeedRepository.seed();
  }


}
