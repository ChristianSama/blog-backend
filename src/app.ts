import express from "express";
import passport from "passport";
import passportConfig from "./config/passport";
import usersRouter from "./routes/users";
import postsRouter from "./routes/posts";
import authRouter from "./routes/auth";
import path from "path";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

passportConfig(passport);
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/auth", authRouter);
app.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  usersRouter
);
app.use(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postsRouter
);

//Start Server
const server = app.listen(process.env.PORT, () => {
  console.log("Server listening on port 3000");
});
