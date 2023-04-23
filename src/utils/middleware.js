import jwt from "./jwt";

const ignoreRoutes = ["POST:/login", "POST:/signup", "GET:/graphql"];

const checkToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (ignoreRoutes.includes(`${req.method}:${req.path}`)) return next();
  if (!authorization) return next(new Error("Invalid header"));
  const authorizationHeader = authorization.split(" ");
  if (authorizationHeader < 2) {
    next(new Error("Invalid header"));
  }
  const token = authorizationHeader[1];
  try {
    await jwt.verifyToken(req, token);
    next();
  } catch (error) {
    next(error);
  }
};

export default {
  checkToken,
};
