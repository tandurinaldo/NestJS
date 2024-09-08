import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  minjamBuku: number;

  @Column({ default: false })
  penalty: boolean;

  @Column({ type: 'date', nullable: true })
  penaltyEndDate: Date | null;
}
