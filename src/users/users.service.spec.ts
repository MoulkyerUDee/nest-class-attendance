import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { CreateUserDto } from './dto/create-user.dto';

jest.mock('./entities/user.entity', () => ({
  User: class User {}
}));

jest.mock('./entities/role.entity', () => ({
  Role: class Role {}
}));

import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { Student } from '../student/entities/student.entity';
import { Supervisor } from '../supervisor/entities/supervisor.entity';

describe('UsersService', () => {
  let service: UsersService;
  let rolesService: RolesService;
  let userRepo: any;

  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
  };

  const mockRoleRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const mockRolesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByUserId: jest.fn(),
  };

  const mockTeacherRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
  };

  const mockStudentRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
  };

  const mockSupervisorRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: RolesService,
          useValue: mockRolesService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleRepository,
        },
        { provide: getRepositoryToken(Teacher), useValue: mockTeacherRepository },
        { provide: getRepositoryToken(Student), useValue: mockStudentRepository },
        { provide: getRepositoryToken(Supervisor), useValue: mockSupervisorRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    rolesService = module.get<RolesService>(RolesService);
    userRepo = mockUserRepository;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user with a teacher role', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'password123',
        role: 'teacher',
        roleStatus: 'active',
        fullName: 'Test User',
        email: 'testuser@example.com',
        phone: '1234567890'
      };

      const savedUser = {
        id: 1,
        username: 'testuser',
        password: 'password123',
      };

      const savedTeacher = {
        id: 1,
        Fname: 'Test',
        Lname: 'User',
        Phone: '1234567890',
        email: 'testuser@example.com',
        classes: [],
        comments: [],
        user: savedUser
      };

      const userWithRoles = {
        id: 1,
        username: 'testuser',
        password: 'password123',
        roles: [
          {
            id: 1,
            type: 'teacher',
            status: 'active',
            user: { id: 1 },
          },
        ],
      };

      userRepo.save.mockResolvedValue(savedUser);
      mockTeacherRepository.create.mockReturnValue(savedTeacher);
      mockTeacherRepository.save.mockResolvedValue(savedTeacher);
      mockRolesService.create.mockResolvedValue({
        id: 1,
        type: 'teacher',
        status: 'active',
        user: savedUser,
      });
      userRepo.findOne.mockResolvedValue(userWithRoles);

      const result = await service.create(createUserDto);

      expect(userRepo.save).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
        fullName: 'Test User',
        email: 'testuser@example.com'
      });

      expect(mockTeacherRepository.create).toHaveBeenCalledWith({
        Fname: 'Test',
        Lname: 'User',
        Phone: '1234567890',
        email: 'testuser@example.com',
        classes: [],
        comments: [],
        user: savedUser
      });

      expect(mockTeacherRepository.save).toHaveBeenCalled();
      expect(mockRolesService.create).toHaveBeenCalledWith({
        type: 'teacher',
        userId: 1,
        status: 'active',
      });
      expect(result).toEqual(userWithRoles);
    });

    it('should create a user with a student role', async () => {
      const createUserDto: CreateUserDto = {
        username: 'student1',
        password: 'password123',
        role: 'student',
        roleStatus: 'active',
        fullName: 'Student One',
        email: 'student1@example.com'
      };

      const savedUser = {
        id: 1,
        username: 'student1',
        password: 'password123',
      };

      const savedStudent = {
        studentCode: expect.any(Number),
        firstName: 'Student',
        lastName: 'One',
        email: 'student1@example.com',
        academicProgram: 'Default Program',
        yearLevel: 1,
        isActive: true,
        classes: [],
        attendances: []
      };

      const userWithRoles = {
        id: 1,
        username: 'student1',
        password: 'password123',
        roles: [
          {
            id: 1,
            type: 'student',
            status: 'active',
            user: { id: 1 },
          },
        ],
      };

      userRepo.save.mockResolvedValue(savedUser);
      mockStudentRepository.create.mockReturnValue(savedStudent);
      mockStudentRepository.save.mockResolvedValue(savedStudent);
      mockRolesService.create.mockResolvedValue({
        id: 1,
        type: 'student',
        status: 'active',
        user: savedUser,
      });
      userRepo.findOne.mockResolvedValue(userWithRoles);

      const result = await service.create(createUserDto);

      expect(userRepo.save).toHaveBeenCalledWith({
        username: 'student1',
        password: 'password123',
        fullName: 'Student One',
        email: 'student1@example.com'
      });

      expect(mockStudentRepository.create).toHaveBeenCalledWith({
        studentCode: expect.any(Number),
        firstName: 'Student',
        lastName: 'One',
        email: 'student1@example.com',
        isActive: true,
        academicProgram: 'Default Program',
        yearLevel: 1,
        classes: [],
        attendances: []
      });
      
      expect(mockStudentRepository.save).toHaveBeenCalled();
      expect(mockRolesService.create).toHaveBeenCalledWith({
        type: 'student',
        userId: 1,
        status: 'active',
      });
      expect(result).toEqual(userWithRoles);
    });

    it('should create a user with a supervisor role', async () => {
      const createUserDto: CreateUserDto = {
        username: 'supervisor1',
        password: 'password123',
        role: 'supervisor',
        roleStatus: 'active',
        fullName: 'Super Visor',
        email: 'supervisor@example.com',
        phone: '1234567890'
      };

      const savedUser = {
        id: 1,
        username: 'supervisor1',
        password: 'password123',
      };

      const savedSupervisor = {
        id: 1,
        firstName: 'Super',
        lastName: 'Visor',
        email: 'supervisor@example.com',
        phone: '1234567890',
        employeeId: expect.stringMatching(/^SUP-\d{4}-\d{3}$/),
        user: savedUser
      };

      const userWithRoles = {
        id: 1,
        username: 'supervisor1',
        password: 'password123',
        roles: [
          {
            id: 1,
            type: 'supervisor',
            status: 'active',
            user: { id: 1 },
          },
        ],
      };

      userRepo.save.mockResolvedValue(savedUser);
      mockSupervisorRepository.create.mockReturnValue(savedSupervisor);
      mockSupervisorRepository.save.mockResolvedValue(savedSupervisor);
      mockRolesService.create.mockResolvedValue({
        id: 1,
        type: 'supervisor',
        status: 'active',
        user: savedUser,
      });
      userRepo.findOne.mockResolvedValue(userWithRoles);

      const result = await service.create(createUserDto);

      expect(userRepo.save).toHaveBeenCalledWith({
        username: 'supervisor1',
        password: 'password123',
        fullName: 'Super Visor',
        email: 'supervisor@example.com'
      });

      expect(mockSupervisorRepository.create).toHaveBeenCalledWith({
        firstName: 'Super',
        lastName: 'Visor',
        email: 'supervisor@example.com',
        phone: '1234567890',
        department: undefined,
        employeeId: expect.stringMatching(/^SUP-\d{4}-\d{3}$/),
        user: savedUser
      });
      
      expect(mockSupervisorRepository.save).toHaveBeenCalled();
      expect(mockRolesService.create).toHaveBeenCalledWith({
        type: 'supervisor',
        userId: 1,
        status: 'active',
      });
      expect(result).toEqual(userWithRoles);
    });
  });
});
