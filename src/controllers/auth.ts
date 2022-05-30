import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const getSignup = (req: Request, res: Response) => {
  res.render("auth/signup");
};

export const postSignup = (req: Request, res: Response, next: NextFunction) => {
  
  passport.authenticate("signup", { session: false }, (err, user, info) => {
    if (err || !user) {
      req.flash("info", info.message);
      return res.redirect("/auth/signup");
    }
    return res.redirect("/auth/login");
  })(req, res, next);
};

export const getLogin = (req: Request, res: Response) => {
  res.render("auth/login");
};

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "login",
    {
      session: false,
    },
    (err, user, info) => {
      //Pass flash message
      req.flash("info", info.message);

      // If authentication failed redirect to login page
      if (err || !user) {
        return res.redirect("/auth/login");
      }
      // Generate token
      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });
      return res
        .cookie("jwtToken", token, {
          httpOnly: true, //not accesible through document.cookie TODO: handle httpOnly
          maxAge: 60 * 60 * 1000, //1 hour
          // secure: true, //if using https
          signed: true, //to make sure client can't modify the cookie
        })
        .redirect("/");
    }
  )(req, res, next);
};

export const postLogout = (req: Request, res: Response) => {
  res.clearCookie("jwtToken");
  res.redirect("/");
};
