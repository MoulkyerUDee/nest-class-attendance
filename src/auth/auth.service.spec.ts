import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService: Partial<UsersService>;
  let mockJwtService: Partial<JwtService>;

  beforeEach(async () => {
    mockUsersService = {
      findOneByUsername: jest.fn()
    };

    mockJwtService = {
      signAsync: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService
        },
        {
          provide: JwtService,
          useValue: mockJwtService
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return access token when credentials are valid', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        password: 'password123',
        roles: [{ type: 'teacher' }]
      };
      const mockToken = 'mock.jwt.token';

      mockUsersService.findOneByUsername = jest.fn().mockResolvedValue(mockUser);
      mockJwtService.signAsync = jest.fn().mockResolvedValue(mockToken);

      const result = await service.signIn('testuser', 'password123');

      expect(result).toEqual({ access_token: mockToken });
      expect(mockUsersService.findOneByUsername).toHaveBeenCalledWith('testuser');
      expect(mockJwtService.signAsync).toHaveBeenCalledWith({
        sub: mockUser.id,
        username: mockUser.username,
        roles: ['teacher']
      });
    });

    it('should throw UnauthorizedException when password is incorrect', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        password: 'correctpass',
        roles: []
      };

      mockUsersService.findOneByUsername = jest.fn().mockResolvedValue(mockUser);

      await expect(service.signIn('testuser', 'wrongpass')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when user is not found', async () => {
      mockUsersService.findOneByUsername = jest.fn().mockResolvedValue(null);

      await expect(service.signIn('nonexistent', 'anypass')).rejects.toThrow(UnauthorizedException);
    });
  });
});
