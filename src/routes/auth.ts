import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import 'dotenv/config'

const router = express.Router();

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

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET as string);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

export default router;
