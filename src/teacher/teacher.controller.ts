import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { MeetingStatus } from 'src/enums/meeting-status.enum';
import { CreateTeacherClassDto } from './dto/create-teacher-class.dto';
import { UpdateTeacherClassDto } from './dto/update-teacher-class.dto';
import { CreateAttendanceCommentDto } from './dto/create-attendance-comment.dto';

@ApiTags('teachers')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor)
  @Post()
  @ApiOperation({ summary: 'Create a new teacher' })
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Get()
  @ApiOperation({ summary: 'Get all teachers' })
  findAll() {
    return this.teacherService.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Get(':id')
  @ApiOperation({ summary: 'Get a teacher by ID' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a teacher' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(+id, updateTeacherDto);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a teacher' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Post(':id/classes')
  @ApiOperation({ summary: 'Create a new class for a teacher' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  createClass(
    @Param('id') id: string,
    @Body() createTeacherClassDto: CreateTeacherClassDto
  ) {
    return this.teacherService.createClass(+id, createTeacherClassDto);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Get(':id/classes')
  @ApiOperation({ summary: 'Get all classes for a teacher' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  getClasses(@Param('id') id: string) {
    return this.teacherService.getClasses(+id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Get(':id/classes/:classId')
  @ApiOperation({ summary: 'Get a specific class for a teacher' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  @ApiParam({ name: 'classId', description: 'Class ID' })
  getClass(
    @Param('id') id: string,
    @Param('classId') classId: string
  ) {
    return this.teacherService.getClass(+id, +classId);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Patch(':id/classes/:classId')
  @ApiOperation({ summary: 'Update a class for a teacher' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  @ApiParam({ name: 'classId', description: 'Class ID' })
  updateClass(
    @Param('id') id: string,
    @Param('classId') classId: string,
    @Body() updateTeacherClassDto: UpdateTeacherClassDto
  ) {
    return this.teacherService.updateClass(+id, +classId, updateTeacherClassDto);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Delete(':id/classes/:classId')
  @ApiOperation({ summary: 'Delete a class for a teacher' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  @ApiParam({ name: 'classId', description: 'Class ID' })
  removeClass(
    @Param('id') id: string,
    @Param('classId') classId: string
  ) {
    return this.teacherService.removeClass(+id, +classId);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Post(':id/classes/:classId/meetings')
  @ApiOperation({ summary: 'Create a new meeting for a class' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  @ApiParam({ name: 'classId', description: 'Class ID' })
  createMeeting(
    @Param('id') teacherId: string,
    @Param('classId') classId: string,
    @Body() createMeetingDto: CreateMeetingDto
  ) {
    return this.teacherService.createMeeting(+teacherId, createMeetingDto);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Get(':id/classes/:classId/meetings')
  @ApiOperation({ summary: 'Get all meetings for a class' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  @ApiParam({ name: 'classId', description: 'Class ID' })
  getClassMeetings(
    @Param('id') teacherId: string,
    @Param('classId') classId: string
  ) {
    return this.teacherService.getClassMeetings(+teacherId, +classId);
  }
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Get(':id/classes/:classId/meetings/:meetingId')
  @ApiOperation({ summary: 'Get a specific meeting with comments' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  @ApiParam({ name: 'classId', description: 'Class ID' })
  @ApiParam({ name: 'meetingId', description: 'Meeting ID' })
  getMeetingWithComments(
    @Param('id') teacherId: string,
    @Param('classId') classId: string,
    @Param('meetingId') meetingId: string
  ) {
    return this.teacherService.getMeetingWithComments(+teacherId, +classId, +meetingId);
  }  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Post(':id/meetings/:meetingId/attendance-comments')
  @ApiOperation({ summary: 'Create a new attendance comment' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  @ApiParam({ name: 'meetingId', description: 'Meeting ID' })
  createAttendanceComment(
    @Param('id') id: string,
    @Param('meetingId') meetingId: string,
    @Body() createAttendanceCommentDto: CreateAttendanceCommentDto
  ) {
    return this.teacherService.createAttendanceComment(+id, +meetingId, createAttendanceCommentDto);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Get(':id/meetings/:meetingId/attendance-comments')
  @ApiOperation({ summary: 'Get all attendance comments for a meeting' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  @ApiParam({ name: 'meetingId', description: 'Meeting ID' })
  getAttendanceComments(
    @Param('id') id: string,
    @Param('meetingId') meetingId: string
  ) {
    return this.teacherService.getAttendanceComments(+id, +meetingId);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Patch(':id/classes/:classId/meetings/:meetingId')
  @ApiOperation({ summary: 'Update a meeting' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  @ApiParam({ name: 'classId', description: 'Class ID' })
  @ApiParam({ name: 'meetingId', description: 'Meeting ID' })
  updateMeeting(
    @Param('id') teacherId: string,
    @Param('classId') classId: string,
    @Param('meetingId') meetingId: string,
    @Body() updateMeetingDto: UpdateMeetingDto
  ) {
    return this.teacherService.updateMeeting(+teacherId, +classId, +meetingId, updateMeetingDto);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Delete(':id/classes/:classId/meetings/:meetingId')
  @ApiOperation({ summary: 'Delete a meeting' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  @ApiParam({ name: 'classId', description: 'Class ID' })
  @ApiParam({ name: 'meetingId', description: 'Meeting ID' })
  deleteMeeting(
    @Param('id') teacherId: string,
    @Param('classId') classId: string,
    @Param('meetingId') meetingId: string
  ) {
    return this.teacherService.deleteMeeting(+teacherId, +classId, +meetingId);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Supervisor, Role.Teacher)
  @Patch(':id/classes/:classId/meetings/:meetingId/status')
  @ApiOperation({ summary: 'Change meeting status' })
  @ApiParam({ name: 'id', description: 'Teacher ID' })
  @ApiParam({ name: 'classId', description: 'Class ID' })
  @ApiParam({ name: 'meetingId', description: 'Meeting ID' })
  changeMeetingStatus(
    @Param('id') teacherId: string,
    @Param('classId') classId: string,
    @Param('meetingId') meetingId: string,
    @Body('status') status: MeetingStatus
  ) {
    return this.teacherService.changeMeetingStatus(+teacherId, +classId, +meetingId, status);
  }
}
