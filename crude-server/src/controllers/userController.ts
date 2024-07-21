import { Request, Response } from 'express';
import userService from '../services/userService';

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const filters = {
        name: req.query.name as string,
        email: req.query.email as string,
        age: req.query.age ? parseInt(req.query.age as string, 10) : undefined
      };
      const users = await userService.getUsers(filters);
      res.send(users);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const user = await userService.getUser(req.params.id);
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const result = await userService.deleteUser(req.params.id);
      if (!result) {
        return res.status(404).send();
      }
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}

export default new UserController();
