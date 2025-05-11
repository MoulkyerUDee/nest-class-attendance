import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
  ) {}
  
  
  create(createUserDto: CreateUserDto) {
    return this.userRepo.save(createUserDto);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({
      id
    });
  }
  findOneByUsername(username:string) {
    return this.repo.findOneBy({
      username
    });
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async assignRole(userId: number, roleId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    const role = await this.roleRepo.findOneBy({ id: roleId });
    if (user && role) {
      user.role = role;
      return this.userRepo.save(user);
    }
    return null;
  }
}
