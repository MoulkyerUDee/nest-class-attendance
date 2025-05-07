import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { User } from './entities/user.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const user = await this.userRepository.findOne({
      where: { id: createRoleDto.userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const role = this.roleRepository.create({
      ...createRoleDto,
      user,
    });

    return this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find({ relations: ['user'] });
  }

  async findByUserId(userId: number): Promise<Role[]> {
    return this.roleRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}