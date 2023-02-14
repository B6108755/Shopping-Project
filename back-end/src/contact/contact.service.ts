import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  create(createContactDto: CreateContactDto) {
    return this.contactRepository.save(createContactDto);
  }

  findAll() {
    return this.contactRepository.find();
  }

  findOne(id: number): Promise<Contact> {
    return this.contactRepository.findOneBy({ id });
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return this.contactRepository.update(id, updateContactDto);
  }

  async remove(id: string): Promise<void> {
    await this.contactRepository.delete(id);
  }
}
