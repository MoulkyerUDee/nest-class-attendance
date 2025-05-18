import { Test, TestingModule } from '@nestjs/testing';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Class } from '../class/entities/class.entity';
import { Meeting } from '../meetings/entities/meeting.entity';
import { CommentsService } from '../comments/comments.service';

describe('TeacherController', () => {
  let controller: TeacherController;
  let service: TeacherService;

  const mockTeacherRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockClassRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockMeetingRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockCommentsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [
        TeacherService,
        {
          provide: getRepositoryToken(Teacher),
          useValue: mockTeacherRepository,
        },
        {
          provide: getRepositoryToken(Class),
          useValue: mockClassRepository,
        },
        {
          provide: getRepositoryToken(Meeting),
          useValue: mockMeetingRepository,
        },
        {
          provide: CommentsService,
          useValue: mockCommentsService,
        },
      ],
    }).compile();

    controller = module.get<TeacherController>(TeacherController);
    service = module.get<TeacherService>(TeacherService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
