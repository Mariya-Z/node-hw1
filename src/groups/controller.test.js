import { getMockReq, getMockRes } from '@jest-mock/express';
import { GroupsController, groupsServiceInstance } from './controller.js';

const mockGroupsResponse = (items) => Promise.resolve( items );
const mockGroupResponse = (item) => Promise.resolve( item );

const group1 = { id: '1' };
const group2 = { id: '2' };
const group3 = { id: '3' };

const groupsMockResponse = mockGroupsResponse([group1, group2, group3]);
const groupMockResponse = mockGroupResponse(group1);
const emptyResponse = Promise.resolve(null);

const groupsController = new GroupsController();

describe('Groups controller', () => {

  describe('get all', () => {
    it('should provide all groups', async() => {
      const req = getMockReq();
      const { res, next } = getMockRes(groupsMockResponse);
      jest.spyOn(groupsServiceInstance, 'getAll').mockReturnValueOnce(groupsMockResponse);
      await groupsController.getGroups(req, res, next);

      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(expect.objectContaining(groupsMockResponse));
    });
  });

  describe('get one', () => {
    it('should return response with status 200 for existing id', async() => {
      const req = getMockReq({ id: 1 });
      const { res, next } = getMockRes(groupMockResponse);
      jest.spyOn(groupsServiceInstance, 'getOneById').mockReturnValueOnce(groupMockResponse);
      await groupsController.getGroupById(req, res, next);

      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(expect.objectContaining(groupMockResponse));
    });

    it('should return response with status 400 for non-existing id', async() => {
      const req = getMockReq({ id: 4 });
      const { res, next } = getMockRes(emptyResponse);
      jest.spyOn(groupsServiceInstance, 'getOneById').mockReturnValueOnce(emptyResponse);
      await groupsController.getGroupById(req, res, next);

      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalled();
    });
  });

  describe('create', () => {
    it('should return created group', async() => {
      const group = {
        name: 'test group', 
        permissions: ['read', 'create']
      };
      const expectedGroup = { 
        ... group,
        id: 4,
      };
      const req = getMockReq({ body: group });
      const { res, next } = getMockRes(expectedGroup);
      const mockResponse = mockGroupResponse(expectedGroup);
      jest.spyOn(groupsServiceInstance, 'create').mockReturnValueOnce(mockResponse);
      await groupsController.createGroup(req, res, next);

      expect(res.status).toBeCalledWith(201);
      expect(res.json).toBeCalledWith(expect.objectContaining(expectedGroup));
    });
  });

  describe('update', () => {
    const group = {
      name: 'test group', 
      permissions: ['read', 'create']
    };

    it('should return updated group for exiting id', async() => {
      const expectedGroup = { 
        ... group,
        id: 1,
      };
      const req = getMockReq({
        body: group,
        params: { id: 1 },
      });
      const { res, next } = getMockRes(expectedGroup);
      const mockResponse = mockGroupResponse([1]);
      jest.spyOn(groupsServiceInstance, 'update').mockReturnValueOnce(mockResponse);
      await groupsController.updateGroup(req, res, next);

      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(expect.objectContaining({
        success: true,
        group: { ...expectedGroup },
      }));
    });

    it('should return response with status 400 for non-existing id', async() => {
      const req = getMockReq({
        body: group,
        params: { id: 4 },
      });
      const { res, next } = getMockRes(emptyResponse);
      const mockResponse = mockGroupResponse([0]);
      jest.spyOn(groupsServiceInstance, 'update').mockReturnValueOnce(mockResponse);
      await groupsController.updateGroup(req, res, next);

      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalled();
    })
  });

  describe('delete', () => {
    it('should delete group for exiting id', async() => {
      const expectedResponse = { 
        success: true,
      };
      const req = getMockReq({
        params: { id: 1 },
      });
      const { res, next } = getMockRes(expectedResponse);
      const mockResponse = mockGroupResponse(1);
      jest.spyOn(groupsServiceInstance, 'delete').mockReturnValueOnce(mockResponse);
      await groupsController.deleteGroup(req, res, next);

      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith(expect.objectContaining(expectedResponse));
    });

    it('should return response with status 400 for non-existing id', async() => {
      const expectedResponse = { 
        success: false,
        message: 'No group with id 4',
      };
      const req = getMockReq({
        params: { id: 4 },
      });
      const { res, next } = getMockRes(expectedResponse);
      const mockResponse = mockGroupResponse(0);
      jest.spyOn(groupsServiceInstance, 'delete').mockReturnValueOnce(mockResponse);
      await groupsController.deleteGroup(req, res, next);

      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalled();
    });
  });

});