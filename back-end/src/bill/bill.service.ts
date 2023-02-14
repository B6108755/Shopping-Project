import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Bill } from './entities/bill.entity';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
  ) {}

  create(CreateBillDto: CreateBillDto) {
    return this.billRepository.save(CreateBillDto);
  }

  findAll(): Promise<Bill[]> {
    return this.billRepository.find();
  }

  findOne(id: number): Promise<Bill> {
    return this.billRepository.findOneBy({ id });
  }

  findByUserId(id: string, status?: string): Promise<Bill[]> {
    if (status) {
      return this.billRepository.query(
        `SELECT * FROM bill WHERE userid = \"${id}\" AND status = \"${status}\"`,
      );
    }
    return this.billRepository.query(
      `SELECT * FROM bill WHERE userid = \"${id}\"`,
    );
  }

  findByStatus(status: string): Promise<Bill[]> {
    return this.billRepository.query(
      `SELECT * FROM bill WHERE status LIKE \"%${status}%\"`,
    );
  }

  update(id: number, UpdateBillDto: UpdateBillDto) {
    return this.billRepository.update(id, UpdateBillDto);
  }

  async remove(id: string): Promise<void> {
    await this.billRepository.delete(id);
  }
}
