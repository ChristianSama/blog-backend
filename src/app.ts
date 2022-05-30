import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import session from "express-session";
import * as passportConfig from "./config/passport";
import flash from "express-flash";
import usersRouter from "./routes/users";
import postsRouter from "./routes/posts";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import path from "path";
import "dotenv/config";

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  cookie: {maxAge: 60000},
  secret: process.env.COOKIE_SECRET as string,
  saveUninitialized: true,
  resave: false}));

app.use(flash());
app.use(express.json());
app.use(express.urlencoded( {extended: true}));
app.use(methodOverride("_method"))

passportConfig.init(passport);
app.use(passport.initialize());

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(passportConfig.checkUser)

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/auth", 
  authRouter
);

app.use("/users",
  passport.authenticate("jwt", { session: false }),
  usersRouter
);

app.use("/posts",
  passport.authenticate("jwt", { session: false }),
  postsRouter
);

//Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.message === "Not Found") {
    res.status(404).send("Page not found");
  }
  else {
    res.status(400).send(err.message);
  }
});

//Unknown route handler
app.get('*', (req, res) => {
  res.status(404).send('what???');
});

export default app;