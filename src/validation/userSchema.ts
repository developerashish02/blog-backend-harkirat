import { z } from "zod";

const passwordRegex =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name must be 3 or more characters long." }),

  lastName: z
    .string()
    .min(3, { message: "Last name must be 3 or more characters long." }),

  email: z.string().email({ message: "Please enter a valid email address." }),

  password: z
    .string()
    .min(8, { message: "Password must be 8 or more characters long" })
    .regex(passwordRegex, {
      message:
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
});

export const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 or more characters long" })
    .regex(passwordRegex, {
      message:
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
});
