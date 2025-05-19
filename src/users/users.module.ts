import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { AttendanceRecord } from '../users/entities/attendance_record.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { Student } from '../student/entities/student.entity';
import { Supervisor } from '../supervisor/entities/supervisor.entity';
import { AttendanceModule } from 'src/attendance/attendance.module';
import { RolesModule } from './roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, AttendanceRecord, Teacher, Student, Supervisor]),
    AttendanceModule, 
    RolesModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
