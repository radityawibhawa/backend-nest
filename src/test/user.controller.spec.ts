import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from 'src/DTO/create-user.dto';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call UserService.create with the correct parameters', async () => {
      const createUserDTO: CreateUserDTO = { username: 'test', email: 'test@test.com', password: 'test' };
      const result = { statusCode: 201, message: 'User Registered Successfully' };

      mockUserService.create.mockResolvedValue(result);

      expect(await controller.create(createUserDTO)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createUserDTO);
    });
  });
});