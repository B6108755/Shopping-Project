import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type Product = {
  name: string;
  price: string;
  quntity: number;
};

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  userid: number;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  product: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  tracking: string;

  @Column()
  priceSum: number;
}
