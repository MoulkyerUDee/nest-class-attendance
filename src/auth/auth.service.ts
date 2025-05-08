import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { RefreshToken } from 'src/users/entities/refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
        @InjectRepository(RefreshToken)
        private refreshTokenRepo: Repository<RefreshToken>,
    ) {}

    async signup(createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    async login(credentials: LoginDto) {
        const { username, password } = credentials;

        const user = await this.usersService.findByUsername(username);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const tokens = await this.generateToken(user.id);

        return {
            ...tokens,
            userId: user.id,
        }
    }

    async generateToken(userId) {
        const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
        const refreshToken = uuidv4();

        await this.storeRefreshToken(refreshToken, userId);

        return {
            accessToken,
            refreshToken,
        };
    }

    async storeRefreshToken(token: string, userId: number) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 3);
    
        const existingToken = await this.refreshTokenRepo.findOne({
            where: { user: { id: userId } },
            relations: ['user'],
        });
    
        if (existingToken) {
            existingToken.token = token;
            existingToken.expiresAt = expiresAt;
            await this.refreshTokenRepo.save(existingToken);
        } else {
            // Create a new token if one doesn't exist
            await this.refreshTokenRepo.save({
                token,
                expiresAt,
                user: { id: userId },
            });
        }
    }     
    
    async refreshTokens(refreshToken: string) {
        const tokenEntry = await this.refreshTokenRepo.findOne({
            where: { token: refreshToken },
            relations: ['user'],
        });
    
        if (!tokenEntry) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    
        if (tokenEntry.expiresAt < new Date()) {
            await this.refreshTokenRepo.delete({ token: refreshToken });
            throw new UnauthorizedException('Refresh token expired');
        }
    
        const userId = tokenEntry.user.id;
    
        await this.refreshTokenRepo.delete({ token: refreshToken });

        return this.generateToken(userId);
    }
    
}
