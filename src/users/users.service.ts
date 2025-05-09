import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}
  
  
  async create(createUserDto: CreateUserDto) {
    const { password, username, ...rest } = createUserDto;
  
    const existingUser = await this.repo.findOneBy({ username });
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = this.repo.create({ ...rest, username, password: hashedPassword });

    return this.repo.save(user);
  }
  

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findByUsername(username: string) {
    return this.repo.findOneBy({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
