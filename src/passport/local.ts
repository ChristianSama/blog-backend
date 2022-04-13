import { PrismaClient } from "@prisma/client";
import { Strategy } from "passport-local";
import passport from "passport";
import argon2id from "argon2";

const prisma = new PrismaClient();

passport.use(
  "signup",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        // Check if user found
        const existsEmail = await prisma.user.findFirst({ where: { email } });
        if (existsEmail)
          return done(null, false, {
            message: "Email already exists.",
          });

        // Create the user
        const user = await prisma.user.create({
          data: {
            name: req.body.name,
            lastname: req.body.lastname,
            email,
            password: await argon2id.hash(password),
          },
        });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "login",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        //Check id user found
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return done(null, false, {
            message: "No user found",
          });
        }

        //Compare password and hash
        const validPassword = await argon2id.verify(
          user.password as string,
          password
        );
        if (!validPassword) {
          return done(null, false, {
            message: "Wrong password",
          });
        }
        return done(null, user, {
          message: "Logged in successfully",
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);
