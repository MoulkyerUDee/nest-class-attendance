import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AccessToken } from './dto/access-token.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({
        operationId: 'login'
    })
    @ApiResponse({
        status: 201,
        type:  AccessToken
        
    })
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }
}
