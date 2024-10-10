import Elysia from "elysia";
import {
  signInController,
  signUpController,
} from "../controllers/userController";

export default (app: Elysia) => {
  app
    .post("/api/v1/sign-up", signUpController)
    .post("/api/v1/sign-in", signInController);
};
