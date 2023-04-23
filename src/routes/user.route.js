module.exports = (app, { container }) => {
  const userController = container.resolve("userController");
  // app.get("/", userController.getUser.bind(userController));
  app.get("/", userController.getUser.bind(userController));
};
