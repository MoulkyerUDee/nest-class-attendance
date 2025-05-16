import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { Classes } from 'src/classes/entities/classes.entity';
import { CreateTeacherClassDto } from './dto/create-teacher-class.dto';
import { UpdateTeacherClassDto } from './dto/update-teacher-class.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Classes)
    private classesRepository: Repository<Classes>,
  ) {}

  create(createTeacherDto: CreateTeacherDto) {
    return this.teacherRepository.save(createTeacherDto);
  }

  findAll() {
    return this.teacherRepository.find({
      relations: ['classes', 'user']
    });
  }

  async findOne(id: number) {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
      relations: ['classes', 'user']
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.findOne(id);

    Object.assign(teacher, updateTeacherDto);

    return this.teacherRepository.save(teacher);
  }

  async remove(id: number) {
    const teacher = await this.findOne(id);
    return this.teacherRepository.remove(teacher);
  }


  async createClass(teacherId: number, createTeacherClassDto: CreateTeacherClassDto) {
    const teacher = await this.findOne(teacherId);

    const newClass = this.classesRepository.create({
      ...createTeacherClassDto,
      teacher: teacher
    });

    return this.classesRepository.save(newClass);
  }

  async getClasses(teacherId: number) {
    const teacher = await this.findOne(teacherId);
    return teacher.classes;
  }

  async getClass(teacherId: number, classId: number) {
    const teacher = await this.findOne(teacherId);

    const classEntity = teacher.classes.find(c => c.id === classId);

    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${classId} not found for teacher with ID ${teacherId}`);
    }

    return classEntity;
  }

  async updateClass(teacherId: number, classId: number, updateTeacherClassDto: UpdateTeacherClassDto) {
    await this.findOne(teacherId);

    const classEntity = await this.classesRepository.findOne({
      where: { id: classId, teacher: { id: teacherId } },
      relations: ['teacher']
    });

    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${classId} not found for teacher with ID ${teacherId}`);
    }

    Object.assign(classEntity, updateTeacherClassDto);

    return this.classesRepository.save(classEntity);
  }

  async removeClass(teacherId: number, classId: number) {
    await this.findOne(teacherId);

    const classEntity = await this.classesRepository.findOne({
      where: { id: classId, teacher: { id: teacherId } },
      relations: ['teacher']
    });

    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${classId} not found for teacher with ID ${teacherId}`);
    }

    return this.classesRepository.remove(classEntity);
  }
}
