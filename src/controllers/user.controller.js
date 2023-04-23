// import * as UserService from '../services/user.service';

export default class UserController {
  constructor(opts) {
    this.userService = opts.userService;
  }

  async createUser(req, res) {
    const user = await this.userService.createUser(req.body);
    return res.json(user);
  }

  async updateUser(req, res) {}

  async deleteUser(req, res) {}

  async getUserById(req, res) {
    const user = await this.userService.getUserById(req.params.userId);
    return res.json(user);
  }

  async getUsers(req, res) {
    const users = await this.userService.getUsers();
    return res.json(users);
  }
}
