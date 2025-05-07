import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRoleDto {
  @IsEnum(['admin', 'student', 'teacher', 'supervisor'])
  type: 'admin' | 'student' | 'teacher' | 'supervisor';

  @IsNumber()
  userId: number;

  @IsEnum(['active', 'inactive', 'disable'])
  status: 'active' | 'inactive' | 'disable';
}