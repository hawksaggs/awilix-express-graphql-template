export default class BaseService {
  constructor({ container, models, utils }) {
    this.container = container;
    this.models = models;
    this.utils = utils;
  }
}
