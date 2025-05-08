import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshToken } from 'src/users/entities/refresh-token.entity';
import { RefreshTokensDto } from './dtos/refresh-tokens.dto';
import { Throttle } from '@nestjs/throttler';


@Throttle({ default: { limit: 3, ttl: 60000 } })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Post('refresh')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokensDto) {
    return this.authService.refreshTokens(refreshTokenDto.token);
  }
}
