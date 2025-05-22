import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsEnum, IsNumber } from 'class-validator';
import { MeetingStatus } from 'src/enums/meeting-status.enum';

export class CreateMeetingDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ enum: MeetingStatus, default: MeetingStatus.UPCOMING })
    @IsEnum(MeetingStatus)
    status: MeetingStatus = MeetingStatus.UPCOMING;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    classId: number;
}
