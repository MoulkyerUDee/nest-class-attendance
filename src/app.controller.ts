import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('bearer')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/about')
  about(): string {
    return 'This is a Class Attendance Service';
  }

  @Get('/protected')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('bearer')
  someProtectedRoute(@Req() req) {
    return { message: 'Access granted', userId: req.userId };
  }
}
