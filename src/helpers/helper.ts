import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const generateToken = (userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRound = 10;
  const hashPassword = await bcrypt.hash(password, saltRound);

  return hashPassword;
};
