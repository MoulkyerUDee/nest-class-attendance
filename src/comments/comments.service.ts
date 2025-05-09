import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}
  
  create(createCommentDto: CreateCommentDto) {
    return this.commentRepository.save(createCommentDto);
  }

  findAll() {
    return this.commentRepository.find;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentRepository.update(id,updateCommentDto);
  }

  remove(id: number) {
    return this.commentRepository.delete(id);
  }
}
