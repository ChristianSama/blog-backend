import express from "express";
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";
import * as passportConfig from "./config/passport";
import usersRouter from "./routes/users";
import postsRouter from "./routes/posts";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import path from "path";
import "dotenv/config";

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({cookie: {maxAge: 60000}, secret: process.env.COOKIE_SECRET as string}));
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

app.get("/flash", (req, res) => {
  req.flash("info", "asdfasdf");
  res.redirect("/")
})

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

//Start Server
const server = app.listen(process.env.PORT, () => {
  console.log("Server listening on port 3000");
});
