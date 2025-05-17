// For API Responses
import { Attendance } from "src/attendance/entities/attendance.entity";

export class StudentResponseDto {
  id: number;
  studentCode: string;
  fullName: string;
  email: string;
  attendanceRate?: number;
  recentAttendances?: Attendance[];
}