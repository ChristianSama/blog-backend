import express from "express";
import usersRouter from "./routes/users";
import session from "express-session";
import postsRouter from "./routes/posts";
import authRouter from "./routes/auth";
import passport from "passport";
import "dotenv/config"
import passportConfig from "./passport/local";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
// app.use(cors());

app.use(session({
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET as string,
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: parseInt(process.env.COOKIE_EXPIRE as string) * 24 * 24 * 60 * 1000}
}))

passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);


//Start Server
const server = app.listen(process.env.PORT, () => {
  console.log("Server listening on port 3000");
});
