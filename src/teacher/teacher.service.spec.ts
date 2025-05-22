import { Test, TestingModule } from '@nestjs/testing';
import { TeacherService } from './teacher.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Class } from '../class/entities/class.entity';
import { Meeting } from '../meetings/entities/meeting.entity';
import { CommentsService } from '../comments/comments.service';
import { NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { Repository } from 'typeorm';

describe('TeacherService', () => {
  let service: TeacherService;
  let teacherRepository: Repository<Teacher>;
  let classRepository: Repository<Class>;
  let meetingRepository: Repository<Meeting>;
  let commentsService: CommentsService;

  beforeEach(async () => {
    const mockTeacherRepo = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const mockClassRepo = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
    };

    const mockMeetingRepo = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
    };

    const mockCommentsService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherService,
        {
          provide: getRepositoryToken(Teacher),
          useValue: mockTeacherRepo,
        },
        {
          provide: getRepositoryToken(Class),
          useValue: mockClassRepo,
        },
        {
          provide: getRepositoryToken(Meeting),
          useValue: mockMeetingRepo,
        },
        {
          provide: CommentsService,
          useValue: mockCommentsService,
        },
      ],
    }).compile();

    service = module.get<TeacherService>(TeacherService);
    teacherRepository = module.get<Repository<Teacher>>(getRepositoryToken(Teacher));
    classRepository = module.get<Repository<Class>>(getRepositoryToken(Class));
    meetingRepository = module.get<Repository<Meeting>>(getRepositoryToken(Meeting));
    commentsService = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a teacher', async () => {
      const createTeacherDto: CreateTeacherDto = {
        Fname: 'John',
        Lname: 'Doe',
        Age: '35',
        Address: '123 Main St',
        Phone: '1234567890'
      };

      const savedTeacher = {
        id: 1,
        Fname: 'John',
        Lname: 'Doe',
        Phone: '1234567890',
        classes: [],
        comments: [],
        user: undefined,
        email: undefined
      };

      jest.spyOn(teacherRepository, 'save').mockResolvedValue(savedTeacher);

      const result = await service.create(createTeacherDto);

      expect(result).toEqual(savedTeacher);
      expect(teacherRepository.save).toHaveBeenCalledWith(createTeacherDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of teachers', async () => {
      const mockTeachers = [
        { 
          id: 1, 
          Fname: 'John',
          Lname: 'Doe',
          Phone: '1234567890',
          email: undefined,
          classes: [],
          comments: [],
          user: { id: 1, username: 'testuser1', password: 'password', roles: [] }
        },
        {
          id: 2,
          Fname: 'Jane',
          Lname: 'Smith',
          Phone: '0987654321',
          email: undefined,
          classes: [],
          comments: [],
          user: { id: 2, username: 'testuser2', password: 'password', roles: [] }
        }
      ];

      jest.spyOn(teacherRepository, 'find').mockResolvedValue(mockTeachers);

      const result = await service.findAll();

      expect(result).toEqual(mockTeachers);
      expect(teacherRepository.find).toHaveBeenCalledWith({
        relations: ['classes', 'user']
      });
    });
  });

  describe('findOne', () => {
    it('should return a teacher when found', async () => {
      const mockTeacher = {
        id: 1,
        Fname: 'John',
        Lname: 'Doe',
        Phone: '1234567890',
        email: undefined,
        classes: [],
        comments: [],
        user: { id: 1, username: 'testuser', password: 'password', roles: [] }
      };

      jest.spyOn(teacherRepository, 'findOne').mockResolvedValue(mockTeacher);

      const result = await service.findOne(1);

      expect(result).toEqual(mockTeacher);
      expect(teacherRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['classes', 'user']
      });
    });

    it('should throw NotFoundException when teacher is not found', async () => {
      jest.spyOn(teacherRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
