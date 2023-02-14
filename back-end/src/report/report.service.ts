import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  create(createReportDto: CreateReportDto) {
    return this.reportRepository.save(createReportDto);
  }

  findAll(): Promise<Report[]> {
    return this.reportRepository.query(
      `SELECT * FROM report ORDER BY report.status ASC `,
    );
  }

  findOne(id: number): Promise<Report> {
    return this.reportRepository.findOneBy({ id });
  }

  findReportByUserId(id: string): Promise<Report[]> {
    console.log(`SELECT * FROM \`report\` WHERE userid = \"${id}\"`);
    return this.reportRepository.query(
      `SELECT * FROM \`report\` WHERE userid = \"${id}\"`,
    );
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return this.reportRepository.update(id, updateReportDto);
  }

  async remove(id: string): Promise<void> {
    await this.reportRepository.delete(id);
  }
}
