import { NextFunction, Request, Response } from 'express'
import passport from "passport"
import jwt from "jsonwebtoken"

export const getSignup = (req: Request, res: Response) => {
  res.render("auth/signup")
}

export const postSignup = (req: Request, res: Response) => {
  passport.authenticate("signup", { session: false }),
  async (req: Request, res: Response) => {
    res.json({
      message: "Signup successfull",
      user: req.user,
    });
  }
}

export const getLogin = (req: Request, res: Response) => {
  res.render("auth/login")
}

export const postLogin = (req: Request, res: Response) => {
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("login", { session: false }, (err, user, info) => {
      // Check for errors
      if (err) throw new Error(err);

      // Generate token
      const payload = { id: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });
      return (
        res
          .cookie("jwtToken", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 5,
            secure: true,
            signed: true,
          })
          .status(201)
          // .json({
          //   status: "success",
          //   data: {
          //     message: "Welcome back.",
          //     user,
          //     token,
          //   },
          //   statusCode: res.statusCode,
          // });
          .redirect("/")
      );
    })(req, res, next);
  }
}

export const postLogout = (req: Request, res: Response) => {
  res.clearCookie("jwtToken");
  res.redirect("/");
}