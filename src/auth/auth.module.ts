import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { RefreshToken } from 'src/users/entities/refresh-token.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule,
    TypeOrmModule.forFeature([RefreshToken]),
  ],
})
export class AuthModule {}
