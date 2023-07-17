import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { Follow } from '../models/follow.model';
import { ForbiddenException, BadRequestException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let user: typeof User;
  let follow: typeof Follow;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'User',
          useValue: {
            findAll: jest.fn(),
            findByPk: jest.fn(),
          },
        },
        {
          provide: 'Follow',
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    user = module.get<typeof User>('User');
    follow = module.get<typeof Follow>('Follow');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers = user.findAll();
      jest.spyOn(user, 'findAll').mockReturnValueOnce(mockUsers);
    });
  });

  describe('delete', () => {
    it('should delete a user by id', async () => {
      const mockUser = { $set: jest.fn() };
      const duser = user.findByPk(1);
      jest.spyOn(user, 'findByPk').mockReturnValueOnce(duser);
      expect(await service.delete(1)).toEqual('user successfully deleted');
      expect(mockUser.$set).toHaveBeenCalledWith(
        'deletedAt',
        expect.any(Number),
      );
    });

    it('should throw a ForbiddenException if user is not found', async () => {
      // user.findByPk.mockResolvedValue(null);
      jest.spyOn(user, 'findByPk').mockReturnValueOnce(null);
      await expect(service.delete(1)).rejects.toThrow(
        new ForbiddenException('user not found'),
      );
    });
  });

  describe('followUser', () => {
    it('should create a follow relation between users', async () => {
      const mockUser = { id: 1, followed_id: 2 };
      jest.spyOn(follow, 'create').mockReturnValueOnce(mockUser);
      // follow.create.mockResolvedValue(mockUser);
      expect(await service.followUser(mockUser)).toEqual('');
      expect(follow.create).toHaveBeenCalledWith({
        followerId: mockUser.id,
        followedId: mockUser.followed_id,
      });
    });

    it('should throw a ForbiddenException if wrong user data is provided', async () => {
      const mockUser = { id: null, followed_id: null };
      // follow.create.mockRejectedValue(new Error());
      jest.spyOn(follow, 'create').mockReturnValueOnce(new Error());
      await expect(service.followUser(mockUser)).rejects.toThrow(
        new ForbiddenException('wrong user data'),
      );
    });
  });

  describe('adminDelete', () => {
    it('should delete a user by id and mark as deleted by admin', async () => {
      const mockUser = { $set: jest.fn(), save: jest.fn() };
      user.findByPk.mockResolvedValue(mockUser);
      expect(await service.adminDelete(1)).toEqual('user is updated');
      expect(mockUser.$set).toHaveBeenCalledWith(
        'deletedAt',
        expect.any(Number),
      );
      expect(mockUser.$set).toHaveBeenCalledWith('deletedBy', 'Admin');
      expect(mockUser.save).toHaveBeenCalled();
    });

    it('should throw a ForbiddenException if user is not found', async () => {
      user.findByPk.mockResolvedValue(null);
      await expect(service.adminDelete(1)).rejects.toThrow(
        new ForbiddenException('user not found'),
      );
    });

    it('should throw a BadRequestException if wrong user data is provided', async () => {
      const mockUser = { $set: jest.fn(), save: jest.fn() };
      user.findByPk.mockResolvedValue(mockUser);
      mockUser.save.mockRejectedValue(new Error());
      await expect(service.adminDelete(1)).rejects.toThrow(
        new BadRequestException('wrong user data'),
      );
    });
  });
});
