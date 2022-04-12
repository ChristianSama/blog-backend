import express from "express";
import usersRouter from "./routes/users";
import postsRouter from "./routes/posts";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

//Start Server
const server = app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
