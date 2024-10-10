import { Context } from "elysia";
import jwt from "jsonwebtoken";

export const apiMiddleware = (context: Context) => {
  const { headers } = context;

  const authHeader = headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return {
      status: 401,
      success: false,
      message: "Unauthorized: No token provided.",
    };
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    context.cookie.user = user;

    return;
  } catch (error) {
    return {
      status: 401,
      success: false,
      message: "Unauthorized: Invalid or expired token",
    };
  }
};
