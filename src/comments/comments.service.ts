import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Meeting } from 'src/meetings/entities/meeting.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Meeting)
    private meetingRepository: Repository<Meeting>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const { meetingId, teacherId, ...commentData } = createCommentDto;

    const meeting = await this.meetingRepository.findOne({
      where: { id: meetingId }
    });

    if (!meeting) {
      throw new NotFoundException(`Meeting with ID ${meetingId} not found`);
    }

    let teacher: Teacher | undefined = undefined;
    if (teacherId) {
      const foundTeacher = await this.teacherRepository.findOne({
        where: { id: teacherId }
      });

      if (!foundTeacher) {
        throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
      }

      teacher = foundTeacher;
    }

    const comment = new Comment();
    comment.content = commentData.content;
    comment.createdAt = commentData.createdAt || new Date();
    comment.meeting = meeting;
    if (teacher) {
      comment.teacher = teacher;
    }

    return this.commentRepository.save(comment);
  }

  findAll() {
    return this.commentRepository.find({
      relations: ['meeting', 'teacher']
    });
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['meeting', 'teacher']
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    await this.findOne(id);

    await this.commentRepository.update(id, updateCommentDto);

    return this.findOne(id);
  }

  async remove(id: number) {
    const comment = await this.findOne(id);
    return this.commentRepository.remove(comment);
  }
}
