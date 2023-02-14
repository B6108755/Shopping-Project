import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Facebook: string;

  @Column()
  Instagram: string;

  @Column()
  Email: string;

  @Column()
  Phone: string;
}
