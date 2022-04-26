import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const getSignup = (req: Request, res: Response) => {
  res.render("auth/signup");
};

export const postSignup = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("signup", { session: false })(req, res, next);
  res.redirect("/");
};

export const getLogin = (req: Request, res: Response) => {
  res.render("auth/login");
};

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    // Check for errors
    if (err) throw new Error(err);
    // Generate token
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    return res
      .cookie("jwtToken", token, {
        httpOnly: true, //not accesible through document.cookie
        maxAge: 60*60*1000, //1 hour
        secure: true, //if using https
        signed: true, //to make sure client can't modify the cookie
      })
      .status(201)
      .redirect("/");
  })(req, res, next);
};

export const postLogout = (req: Request, res: Response) => {
  res.clearCookie("jwtToken");
  res.redirect("/");
};
