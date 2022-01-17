import { Router } from "express";
import passport from "passport";
const router = Router();
require("dotenv").config();

router.get(["/signup", "/signin", "/logout"], (req, res, next) => {
  res.status(200).send({ csrfToken: req.session.token });
});

router.post(
  "/signin",
  passport.authenticate("local_signin", {
    successRedirect: `${process.env.HOSTNAME}:3000/`,
    failureRedirect: `${process.env.HOSTNAME}:3000/user/signin`,
  })
);

router.post(
  "/signup",
  passport.authenticate("local_signup", {
    successRedirect: `${process.env.HOSTNAME}:3000/`,
    failureRedirect: `${process.env.HOSTNAME}:3000/user/signup`,
  })
);

router.post("/logout", (req, res, next) => {
  if (req.user) {
    req.logout();
    // redirect doesnt work so send back URL
    //or in this case, just tell react to go to home page
    res.status(200).end();
  }
});

router.get("/authorize", (req, res, next) => {
  if (req.user) {
    res.send(true);
  } else {
    res.send(false);
  }
});

export default router;
