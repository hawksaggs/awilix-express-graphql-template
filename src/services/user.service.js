import BaseService from "./base.service";

export default class UserService extends BaseService {
  constructor({ container, models, utils }) {
    super({ container, models, utils });
  }

  async getUsers() {
    const {
      models: { User },
    } = this;
    try {
      return User.find({ isActive: true }, "-password");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserById(userId) {
    const {
      models: { User },
    } = this;
    try {
      return User.findById(userId, "name email isActive");
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createUser(user) {
    const {
      models: { User },
    } = this;
    try {
      const userModel = new User(user);
      return userModel.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUserByEmail(email) {
    const {
      models: { User },
    } = this;
    try {
      return User.findOne({ email }, "name email isActive");
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
