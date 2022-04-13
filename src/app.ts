import express from "express";
import usersRouter from "./routes/users";
import postsRouter from "./routes/posts";
import authRouter from "./routes/auth";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("auth", authRouter);

//Start Server
const server = app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
