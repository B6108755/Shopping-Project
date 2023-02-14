import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const cheackUsername = await this.usersRepository.query(
      `SELECT * FROM user WHERE username = "${createUserDto.username}"`,
    );
    if (cheackUsername[0] === undefined) {
      return this.usersRepository.save(createUserDto);
    } else {
      return { status: "404" };
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username: username });
  }

  // findById(id: number): Promise<User> {
  //   return this.usersRepository.findOneBy({ id });
  // }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }
}
