import { Test, TestingModule } from '@nestjs/testing';
import { ClassService } from './class.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';

const mockClassRepository = {};
const mockTeacherRepository = {};

describe('ClassService', () => {
  let service: ClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassService,
        { provide: getRepositoryToken(Class), useValue: mockClassRepository },
        { provide: getRepositoryToken(Teacher), useValue: mockTeacherRepository },
      ],
    }).compile();

    service = module.get<ClassService>(ClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
