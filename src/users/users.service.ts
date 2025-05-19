import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { Student } from '../student/entities/student.entity';
import { Supervisor } from '../supervisor/entities/supervisor.entity';
import { Repository } from 'typeorm';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Role) 
    private roleRepo: Repository<Role>,
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
    @InjectRepository(Supervisor)
    private supervisorRepo: Repository<Supervisor>,
    private rolesService: RolesService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // First create the user
    const user = await this.userRepo.save({
      username: createUserDto.username,
      password: createUserDto.password,
      fullName: createUserDto.fullName,
      email: createUserDto.email
    });

    // Create the role using RolesService
    await this.rolesService.create({
      type: createUserDto.role,
      userId: user.id,
      status: createUserDto.roleStatus || 'active',
    });

    // Based on role type, create corresponding entity
    switch (createUserDto.role) {
      case 'teacher': {
        const [firstName, ...lastNameParts] = createUserDto.fullName.split(' ');
        const teacher = this.teacherRepo.create({
          Fname: firstName,
          Lname: lastNameParts.join(' ') || '',
          Phone: createUserDto.phone,
          email: createUserDto.email,
          classes: [],
          comments: [],
          user: user
        });
        await this.teacherRepo.save(teacher);
        break;
      }
      case 'student': {
        const [firstName, ...lastNameParts] = createUserDto.fullName.split(' ');
        const student = this.studentRepo.create({
          studentCode: parseInt(`${new Date().getFullYear()}${Math.floor(Math.random() * 10000)}`),
          firstName: firstName,
          lastName: lastNameParts.join(' ') || '',
          email: createUserDto.email,
          academicProgram: createUserDto.academicProgram || 'Default Program',
          yearLevel: createUserDto.yearLevel || 1,
          isActive: true,
          classes: [],
          attendances: []
        });
        await this.studentRepo.save(student);
        break;
      }
      case 'supervisor': {
        const [firstName, ...lastNameParts] = createUserDto.fullName.split(' ');
        const supervisor = this.supervisorRepo.create({
          firstName: firstName,
          lastName: lastNameParts.join(' ') || '',
          email: createUserDto.email,
          phone: createUserDto.phone,
          department: createUserDto.department,
          employeeId: `SUP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
          user: user
        });
        await this.supervisorRepo.save(supervisor);
        break;
      }
    }

    // Return user with roles
    return this.userRepo.findOne({
      where: { id: user.id },
      relations: ['roles']
    });
  }

  findAll() {
    return this.userRepo.find({
      relations: ['roles']
    });
  }

  async findOne(id: number) {
    return this.userRepo.findOne({
      where: { id },
      relations: ['roles']
    });
  }
  async findOneByUsername(username: string) {
    return this.userRepo.findOne({
      where: { username },
      relations: ['roles']
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
    const roles = await this.rolesService.findByUserId(roleId);
    if (user && roles?.length) {
      user.roles = roles;
      return this.userRepo.save(user);
    }
    return null;
  }
}
