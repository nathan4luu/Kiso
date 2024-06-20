import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import auth from "./routes/auth.js";
import passport from "passport";
import session from "express-session";
import { PrismaClient } from "@prisma/client";

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const app = express();
const prisma = new PrismaClient();

app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/login/success",
    failureRedirect: "/auth/failure",
  })
);

app.get("/user", isLoggedIn, async (req, res) => {
  const userEmail = req.user._json.email;
  const { userId, userName } = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      id: true,
      name: true,
    },
  });
  req.session.user = req.user;
  res.json(req.user);
});

app.get("/auth/failure", (req, res) => {
  res.send("something went wrong.. ");
});
app.get("/test", isLoggedIn, (req, res) => {
  res.send(req.user);
});

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello! ${req.user.displayName}`);
});

app.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

app.post("/logout",isLoggedIn, (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.sendStatus(500)
    }
  });
  res.redirect('/');
  console.log("logged out");
});

// Routes
app.use("/auth", auth);

const port = process.env.PORT | 4040;
const server = app.listen(port, () => {
  console.log(`Server is running on  ${port}`);
});
