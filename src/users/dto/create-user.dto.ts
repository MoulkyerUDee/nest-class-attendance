import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty({ enum: ['admin', 'student', 'teacher', 'supervisor'], description: 'User role type' })
    @IsEnum(['admin', 'student', 'teacher', 'supervisor'])
    role: 'admin' | 'student' | 'teacher' | 'supervisor';

    @ApiProperty({ enum: ['active', 'inactive', 'disable'], default: 'active', required: false })
    @IsEnum(['active', 'inactive', 'disable'])
    @IsOptional()
    roleStatus?: 'active' | 'inactive' | 'disable' = 'active';
}
