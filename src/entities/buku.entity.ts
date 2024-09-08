import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Buku {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  stock: number;

  @Column({ default: 0 })
  minjam: number;
}
