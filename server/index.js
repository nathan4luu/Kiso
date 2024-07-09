import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import auth from "./routes/auth.js";
import protect from "./routes/api.js";
import passport from "passport";
import session from "express-session";
import { PrismaClient } from "@prisma/client";

export function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const app = express();
const prisma = new PrismaClient();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
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
    successRedirect: "http://localhost:3000/login/loading",
    failureRedirect: "/auth/failure",
  })
);

app.get("/user", isLoggedIn, async (req, res) => {
  const userEmail = req.user._json.email;
  let user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  user.pfp = req.user._json.picture;
  req.session.user = user;
  res.json(user);
});

app.get("/auth/failure", (req, res) => {
  res.redirect("http://localhost:3000");
});
app.get("/test", isLoggedIn, (req, res) => {
  res.send(req.user);
});

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(' <img src="${req.user.profilePhoto}" alt="Profile Photo">');
});

app.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
});

app.post("/logout", isLoggedIn, async (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.sendStatus(500);
    }
  });
  await prisma.$disconnect();
  res.redirect("/");
  console.log("logged out");
});

// Routes
app.use("/auth", auth);
app.use(
  "/api",
  protect //ed
);

const port = process.env.PORT | 4040;
const server = app.listen(port, () => {
  console.log(`Server is running on  ${port}`);
});
