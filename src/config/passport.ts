import { PrismaClient } from "@prisma/client";
import { Strategy as localStrategy } from "passport-local";
import { Strategy as jwtStrategy, ExtractJwt } from "passport-jwt";
import argon2 from "argon2";
import "dotenv/config";

const prisma = new PrismaClient();

export default (passport: any) => {
  passport.use(
    "signup",
    new localStrategy(
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
              password: await argon2.hash(password),
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
    new localStrategy(
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
              message: "Incorrect username or password",
            });
          }
          //Compare password and hash
          const validPassword = await argon2.verify(
            user.password as string,
            password
          );
          if (!validPassword) {
            return done(null, false, {
              message: "Incorrect username or password",
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

  passport.use(
    new jwtStrategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (jwtPayload, done) => {
        console.log(jwtPayload.id);
        try {
          const user = await prisma.user.findUnique({ where: { id: jwtPayload.id } });
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch(err) {
          return done(err, false);
        }
      }
    )
  );
};
