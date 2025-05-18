import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAttendanceCommentDto {
    @ApiProperty({ description: 'Comment content (e.g., "present", "absent", or any attendance note)' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ description: 'Creation date (optional, defaults to current date)' })
    @IsOptional()
    createdAt?: Date;
}
