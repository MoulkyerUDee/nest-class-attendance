import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      signIn: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should call authService.signIn with correct credentials', async () => {
      const signInDto = {
        username: 'testuser',
        password: 'password123',
      };
      const mockToken = { access_token: 'mock.jwt.token' };

      mockAuthService.signIn = jest.fn().mockResolvedValue(mockToken);

      const result = await controller.signIn(signInDto);

      expect(result).toEqual(mockToken);
      expect(mockAuthService.signIn).toHaveBeenCalledWith(
        signInDto.username,
        signInDto.password,
      );
    });
  });
});
