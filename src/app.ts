import express from "express";
import usersRoute from "./routes/users";
import postsRoute from "./routes/posts";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/users", usersRoute);
app.use("/posts", postsRoute);

//Start Server
const server = app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
