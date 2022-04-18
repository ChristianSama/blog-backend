import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("auth/signup")
})

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res) => {
    res.json({
      message: "Signup successfull",
      user: req.user,
    });
  }
);

router.get("/login", (req, res) => {
  res.render("auth/login")
})

router.post("/login", (req, res, next) => {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    // Check for errors
    if (err) throw new Error(err);

    // Generate token
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    return res
      .status(201)
      .cookie("jwtToken", token, {
        httpOnly: true,
        maxAge: (1000*60*5),
        secure: true,
        signed: true
      })
      .json({
        status: "success",
        data: {
          message: "Welcome back.",
          user,
          token,
        },
        statusCode: res.statusCode,
      });
  })(req, res, next);
});

export default router;
