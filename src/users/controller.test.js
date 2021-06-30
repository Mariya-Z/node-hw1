import { getMockReq, getMockRes } from '@jest-mock/express';
import { UsersController, usersServiceInstance } from './controller.js';

const mockUsersResponse = (items) => Promise.resolve( items );
const mockUserResponse = (item) => Promise.resolve( item );

const user1 = { id: '1' };
const user2 = { id: '2' };
const user3 = { id: '3' };

const usersMockResponse = mockUsersResponse([user1, user2, user3]);
const userMockResponse = mockUserResponse(user1);
const emptyResponse = Promise.resolve(null);

const usersController = new UsersController();

describe('Users controller', () => {

  describe('get all', () => {
    it('should provide all users', async() => {
      const req = getMockReq();
      const { res, next } = getMockRes(usersMockResponse);
      jest.spyOn(usersServiceInstance, 'getAll').mockReturnValueOnce(usersMockResponse);
      await usersController.getUsers(req, res, next);

      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(expect.objectContaining(usersMockResponse));
    });

    it('should provide users according to params', async() => {
      const req = getMockReq({
        query: { start_with: 'A', limit: '1' },
      });
      const expectedUser = mockUserResponse({
        id: 4,
        login: 'Ann',
        age: 10,
      });
      const { res, next } = getMockRes(expectedUser);
      jest.spyOn(usersServiceInstance, 'search').mockReturnValueOnce(expectedUser);
      await usersController.getUsers(req, res, next);

      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(expect.objectContaining(expectedUser));
    });
  });

  describe('get one', () => {
    it('should return response with status 200 for existing id', async() => {
      const req = getMockReq({ id: 1 });
      const { res, next } = getMockRes(userMockResponse);
      jest.spyOn(usersServiceInstance, 'getOneById').mockReturnValueOnce(userMockResponse);
      await usersController.getUserById(req, res, next);

      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(expect.objectContaining(userMockResponse));
    });

    it('should return response with status 400 for non-existing id', async() => {
      const req = getMockReq({ id: 4 });
      const { res, next } = getMockRes(emptyResponse);
      jest.spyOn(usersServiceInstance, 'getOneById').mockReturnValueOnce(emptyResponse);
      await usersController.getUserById(req, res, next);

      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalled();
    });
  });

  describe('create', () => {
    it('should return created user', async() => {
      const user = {
        login: 'Tomas',
        password: 'Welcome21',
        age: 18,
      };
      const expectedUser = { 
        login: user.login,
        age: user.age,
        id: 4,
      };
      const req = getMockReq({ body: user });
      const { res, next } = getMockRes(expectedUser);
      const mockResponse = mockUserResponse(expectedUser);
      jest.spyOn(usersServiceInstance, 'create').mockReturnValueOnce(mockResponse);
      await usersController.createUser(req, res, next);

      expect(res.status).toBeCalledWith(201);
      expect(res.json).toBeCalledWith(expect.objectContaining(expectedUser));
    });
  });

  describe('update', () => {
    const user = {
      login: 'Tomas',
      password: 'Welcome21',
      age: 18,
    };

    it('should return updated user for exiting id', async() => {
      const expectedUser = { 
        login: user.login,
        age: user.age,
        id: 1,
      };
      const req = getMockReq({
        body: user,
        params: { id: 1 },
      });
      const { res, next } = getMockRes(expectedUser);
      const mockResponse = mockUserResponse([1]);
      jest.spyOn(usersServiceInstance, 'update').mockReturnValueOnce(mockResponse);
      await usersController.updateUser(req, res, next);

      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(expect.objectContaining({
        success: true,
        user: { ...expectedUser },
      }));
    });

    it('should return response with status 400 for non-existing id', async() => {
      const req = getMockReq({
        body: user,
        params: { id: 4 },
      });
      const { res, next } = getMockRes(emptyResponse);
      const mockResponse = mockUserResponse([0]);
      jest.spyOn(usersServiceInstance, 'update').mockReturnValueOnce(mockResponse);
      await usersController.updateUser(req, res, next);

      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalled();
    });
  });

  describe('delete', () => {
    it('should delete user for exiting id', async() => {
      const expectedResponse = { 
        success: true,
      };
      const req = getMockReq({
        params: { id: 1 },
      });
      const { res, next } = getMockRes(expectedResponse);
      const mockResponse = mockUserResponse([1]);
      jest.spyOn(usersServiceInstance, 'delete').mockReturnValueOnce(mockResponse);
      await usersController.deleteUser(req, res, next);

      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(expect.objectContaining(expectedResponse));
    });

    it('should return response with status 400 for non-existing id', async() => {
      const expectedResponse = { 
        success: false,
        message: 'No user with id 4',
      };
      const req = getMockReq({
        params: { id: 4 },
      });
      const { res, next } = getMockRes(expectedResponse);
      const mockResponse = mockUserResponse(0);
      jest.spyOn(usersServiceInstance, 'delete').mockReturnValueOnce(mockResponse);
      await usersController.deleteUser(req, res, next);

      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalled();
    });
  });
});