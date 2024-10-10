import Elysia from "elysia";
import { apiMiddleware } from "../middleware/apiMiddleware";
import { createBlogHandler } from "../controllers/blogController";

export default (app: Elysia) => {
  app
    .post("/api/v1/blog", createBlogHandler, { beforeHandle: apiMiddleware })
    .put("/api/v1/blog", () => {})
    .get("/api/v1/blog", () => {});
};
