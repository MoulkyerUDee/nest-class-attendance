import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { MeetingStatus } from 'src/enums/meeting-status.enum';

export class UpdateMeetingDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    content?: string;

    @ApiProperty({ enum: MeetingStatus, required: false })
    @IsEnum(MeetingStatus)
    @IsOptional()
    status?: MeetingStatus;
}
