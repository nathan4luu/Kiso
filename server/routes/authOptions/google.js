import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import "dotenv/config";

const prisma = new PrismaClient();
const router = Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4040/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      console.log("logged in");
      const profileEmail = profile._json.email;
      const profileName = profile._json.name;
      const profilePhoto = profile._json.picture;
      const now = new Date();

      try {
        const user = await prisma.user.findUnique({
          where: {
            email: profileEmail,
          },
        });
        if (!user) {
          await prisma.user.create({
            data: {
              email: profileEmail,
              name: profileName,
              profilePhoto: profilePhoto,
            },
          });
        } else {
          await prisma.user.update({
            where: {
              email: profileEmail,
            },
            data: {
              profilePhoto: profilePhoto,
              lastLogIn: now,
            },
          });
        }
        return cb(null, profile);
      } catch (error) {
        console.error("Error during user creation or update:", error);
        return cb(error, null);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

router.get(
  "/",
  passport.authenticate("google", { scope: ["email", "profile", "openid"] })
);

export default router;
