import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userid: number;

  @Column()
  username: string;

  @Column()
  topic: string;

  @Column()
  detail: string;

  @Column()
  phone: string;

  @Column()
  status: boolean;

  @Column()
  note: string;
}
