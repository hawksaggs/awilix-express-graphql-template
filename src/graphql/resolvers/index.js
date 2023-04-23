export const resolvers = {
  Query: {
    users: (_root, _args, { container, user }) => {
      return container.resolve("userService").getUsers();
    },
  },
};
