import { Router } from "express";
import passport from "passport";
import { body, validationResult } from "express-validator";
const router = Router();

require("dotenv").config();

const validateEmailAndPassword = (req, next) => {
  body("email").isEmail().notEmpty();
  body("password").isLength({ min: 8 });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next({
      message:
        "Please check that your form fields are filled, and your password has a minimum length of 8",
    });
  }
};

router.get(["/signup", "/signin", "/logout"], (req, res, next) => {
  res.status(200).end();
});

router.post(
  "/signin",
  passport.authenticate("local_signin", {
    successRedirect: `${process.env.HOSTNAME}:3000/`,
    failureRedirect: `${process.env.HOSTNAME}:3000/user/signin`,
  })
);

router.post("/signup", (req, res, next) => {
  validateEmailAndPassword(req, next);
  passport.authenticate("local_signup", {
    successRedirect: `${process.env.HOSTNAME}:3000/`,
    failureRedirect: `${process.env.HOSTNAME}:3000/user/signup`,
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  if (req.user) {
    req.session.cart = [];
    req.logout();
    // redirect doesnt work due to CORS issues
    //change url on front end side
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
