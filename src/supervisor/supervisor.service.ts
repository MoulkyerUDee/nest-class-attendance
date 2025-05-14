import { Injectable } from '@nestjs/common';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';

@Injectable()
export class SupervisorService {
  create(createSupervisorDto: CreateSupervisorDto) {
    return 'This action adds a new supervisor';
  }

  findAll() {
    return `This action returns all supervisor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supervisor`;
  }

  update(id: number, updateSupervisorDto: UpdateSupervisorDto) {
    return `This action updates a #${id} supervisor`;
  }

  remove(id: number) {
    return `This action removes a #${id} supervisor`;
  }

  getOverview() {
    // Mock data
    return {
      totalStudents: 200,
      totalTeachers: 20,
      totalClasses: 10,
      attendanceToday: {
        present: 180,
        absent: 20,
        percentage: '90%',
      },
      activeSessions: 3,
    };
  }
}
