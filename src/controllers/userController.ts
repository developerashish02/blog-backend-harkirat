import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { signInSchema, signUpSchema } from "../validation/userSchema";
import { SignIn, SignUp } from "../types/userTypes";

import { generateToken, hashPassword } from "../helpers/helper";

const prisma = new PrismaClient();

export const signUpController = async ({ body }: { body: SignUp }) => {
  const validation = signUpSchema.safeParse(body);

  if (!validation.success) {
    const errors = validation.error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));

    return {
      status: 400,
      success: false,
      errorMessages: errors,
    };
  }

  try {
    const { email, password, firstName, lastName } = validation.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        status: 400,
        success: false,
        message: "User already exists with the same email.",
      };
    }

    const hashedPassword = await hashPassword(password);

    console.log(hashedPassword, "hashedPassword");

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    return {
      status: 201,
      success: true,
      data: user,
      message: "User signed up successfully!",
    };
  } catch (error) {
    console.error("SignUp Error:", error);

    return {
      status: 500,
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
};

export const signInController = async ({ body }: { body: SignIn }) => {
  const validatedResult = signInSchema.safeParse(body);

  if (!validatedResult.success) {
    const errors = validatedResult.error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));

    return {
      status: 400,
      success: false,
      errorMessages: errors,
    };
  }

  const { email, password } = validatedResult.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      status: 404,
      success: false,
      message: "user not found.",
    };
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return {
      status: 400,
      success: false,
      message: "Invalid email or password",
    };
  }

  const accessToken = generateToken(user.id);

  return {
    status: 200,
    success: true,
    accessToken,
  };
};
