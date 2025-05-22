import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('StudentService', () => {
  let service: StudentService;
  let mockStudentRepository: Partial<Repository<Student>>;

  beforeEach(async () => {
    mockStudentRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      save: jest.fn(),
      remove: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: mockStudentRepository
        }
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const mockStudents = [
        { studentCode: 1, firstName: 'John', lastName: 'Doe', classes: [], attendances: [] },
        { studentCode: 2, firstName: 'Jane', lastName: 'Smith', classes: [], attendances: [] }
      ];

      mockStudentRepository.find = jest.fn().mockResolvedValue(mockStudents);

      const result = await service.findAll();

      expect(result).toEqual(mockStudents);
      expect(mockStudentRepository.find).toHaveBeenCalledWith({
        relations: ['classes', 'attendances']
      });
    });
  });

  describe('findOne', () => {
    it('should return a student when found', async () => {
      const mockStudent = {
        studentCode: 1,
        firstName: 'John',
        lastName: 'Doe',
        classes: [],
        attendances: []
      };

      mockStudentRepository.findOne = jest.fn().mockResolvedValue(mockStudent);

      const result = await service.findOne(1);

      expect(result).toEqual(mockStudent);
      expect(mockStudentRepository.findOne).toHaveBeenCalledWith({
        where: { studentCode: 1 },
        relations: ['classes', 'attendances.class']
      });
    });

    it('should throw NotFoundException when student is not found', async () => {
      mockStudentRepository.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the student when found', async () => {
      const studentToRemove = {
        studentCode: 1,
        firstName: 'John',
        lastName: 'Doe'
      };

      mockStudentRepository.findOneBy = jest.fn().mockResolvedValue(studentToRemove);
      mockStudentRepository.remove = jest.fn().mockResolvedValue(studentToRemove);

      const result = await service.remove(1);

      expect(result).toEqual(studentToRemove);
      expect(mockStudentRepository.findOneBy).toHaveBeenCalledWith({ studentCode: 1 });
      expect(mockStudentRepository.remove).toHaveBeenCalledWith(studentToRemove);
    });

    it('should throw NotFoundException when student is not found', async () => {
      mockStudentRepository.findOneBy = jest.fn().mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAcademicProgress', () => {
    it('should return academic progress for a student', async () => {
      const mockStudent = {
        studentCode: 1,
        yearLevel: 2,
        academicProgram: 'Computer Science',
        isActive: true
      };

      mockStudentRepository.findOne = jest.fn().mockResolvedValue(mockStudent);

      const result = await service.getAcademicProgress(1);

      expect(result).toEqual({
        currentYear: 2,
        program: 'Computer Science',
        enrollmentStatus: 'Active',
        lastUpdated: expect.any(String)
      });

      expect(mockStudentRepository.findOne).toHaveBeenCalledWith({
        where: { studentCode: 1 },
        select: ['yearLevel', 'academicProgram', 'isActive']
      });
    });

    it('should throw NotFoundException when student is not found', async () => {
      mockStudentRepository.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.getAcademicProgress(999)).rejects.toThrow(NotFoundException);
    });
  });
});
