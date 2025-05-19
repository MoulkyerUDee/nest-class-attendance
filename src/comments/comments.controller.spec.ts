import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Meeting } from 'src/meetings/entities/meeting.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';

const mockCommentRepository = {};
const mockMeetingRepository = {};
const mockTeacherRepository = {};
const mockCommentsService = {};

describe('CommentsController', () => {
  let controller: CommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        { provide: CommentsService, useValue: mockCommentsService },
        { provide: getRepositoryToken(Comment), useValue: mockCommentRepository },
        { provide: getRepositoryToken(Meeting), useValue: mockMeetingRepository },
        { provide: getRepositoryToken(Teacher), useValue: mockTeacherRepository },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
