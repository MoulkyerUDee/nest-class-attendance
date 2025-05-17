import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
//import { ApiBearerAuth} from '@nestjs/swagger';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';


@Controller('supervisor')
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}
  
  //@ApiBearerAuth()
  //@Roles(Role.Admin, Role.Supervisor)
  @Get()
  @ApiOperation({ summary: 'Find all users with supervisor role' })
  findAll() {
    return this.supervisorService.findAll();
  }

  //@ApiBearerAuth()
  //@Roles(Role.Admin, Role.Supervisor)
  @Get(':id')
  @ApiOperation({ summary: 'Find a supervisor by ID' })
  findOne(@Param('id') id: string) {
    return this.supervisorService.findOne(+id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)                                // only admin can delete
  @ApiOperation({ summary: 'Delete a supervisor by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supervisorService.remove(+id);
  }

  @ApiBearerAuth()
  @Roles(Role.Supervisor)                           // only supervisor can access
  @Get('overview')
  @ApiOperation({ summary: 'Get an overview' })
  getOverview() {
    return this.supervisorService.getOverview();
  }

  @Roles(Role.Supervisor, Role.Admin)
  @Get('attendance-summary')
  @ApiOperation({ summary: 'Get an attendance summary' })
  getAttendanceSummary(
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.supervisorService.getAttendanceSummary(from, to);
  }
}


 