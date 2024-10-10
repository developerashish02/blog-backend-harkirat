import { Elysia } from "elysia";
import userRoutes from "./routes/userRoutes";
import blogRoutes from "./routes/blogRoutes";

const app = new Elysia();

userRoutes(app);
blogRoutes(app);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
