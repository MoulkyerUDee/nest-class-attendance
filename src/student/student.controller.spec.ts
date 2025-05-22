import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

describe('StudentController', () => {
  let controller: StudentController;
  let mockStudentService: Partial<StudentService>;

  beforeEach(async () => {
    mockStudentService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      updateProfile: jest.fn(),
      remove: jest.fn(),
      getAcademicProgress: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: StudentService,
          useValue: mockStudentService
        }
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const mockStudents = [
        { studentCode: 1, firstName: 'John', lastName: 'Doe' },
        { studentCode: 2, firstName: 'Jane', lastName: 'Smith' }
      ];

      mockStudentService.findAll = jest.fn().mockResolvedValue(mockStudents);

      const result = await controller.findAll();

      expect(result).toEqual(mockStudents);
      expect(mockStudentService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single student', async () => {
      const mockStudent = {
        studentCode: 1,
        firstName: 'John',
        lastName: 'Doe'
      };

      mockStudentService.findOne = jest.fn().mockResolvedValue(mockStudent);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockStudent);
      expect(mockStudentService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('updateProfile', () => {
    it('should update and return a student', async () => {
      const updateDto = {
        firstName: 'John Updated',
        lastName: 'Doe Updated'
      };

      const mockUpdatedStudent = {
        studentCode: 1,
        ...updateDto
      };

      mockStudentService.updateProfile = jest.fn().mockResolvedValue(mockUpdatedStudent);

      const result = await controller.updateProfile('1', updateDto);

      expect(result).toEqual(mockUpdatedStudent);
      expect(mockStudentService.updateProfile).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove a student', async () => {
      const mockRemovedStudent = {
        studentCode: 1,
        firstName: 'John',
        lastName: 'Doe'
      };

      mockStudentService.remove = jest.fn().mockResolvedValue(mockRemovedStudent);

      const result = await controller.remove('1');

      expect(result).toEqual(mockRemovedStudent);
      expect(mockStudentService.remove).toHaveBeenCalledWith(1);
    });
  });

  describe('getAcademicProgress', () => {
    it('should return academic progress', async () => {
      const mockProgress = {
        yearLevel: 2,
        academicProgram: 'Computer Science',
        enrollmentStatus: 'Active'
      };

      mockStudentService.getAcademicProgress = jest.fn().mockResolvedValue(mockProgress);

      const result = await controller.getAcademicProgress(1);

      expect(result).toEqual(mockProgress);
      expect(mockStudentService.getAcademicProgress).toHaveBeenCalledWith(1);
    });
  });
});
