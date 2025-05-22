import { Test, TestingModule } from '@nestjs/testing';
import { MeetingsController } from './meetings.controller';
import { MeetingsService } from './meetings.service';
import { MeetingsModule } from './meetings.module';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Meeting } from './entities/meeting.entity';

describe('MeetingsController', () => {
  let controller: MeetingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [MeetingsController],
      providers: [MeetingsService, {
        provide: getRepositoryToken(Meeting),
        useValue: {
          find: jest.fn(),
          findOne: jest.fn(),
        },
      }],
    }).compile();

    controller = module.get(MeetingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
