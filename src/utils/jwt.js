import jwt from "jsonwebtoken";

const generateToken = async (data) => {
  const { email } = data;
  try {
    return jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: 60,
    });
  } catch (error) {
    throw new Error("Some error occurred");
  }
};

const verifyToken = async (req, token) => {
  try {
    req.user = await jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export default {
  generateToken,
  verifyToken,
};
