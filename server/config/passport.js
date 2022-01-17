import passport from "passport";
import local from "passport-local";
import User from "../models/User";
import { body, validationResult } from "express-validator";

const LocalStrategy = local.Strategy;

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const validateEmailAndPassword = (done) => {
  body("email").isEmail().notEmpty();
  body("password").isLength({ min: 8 });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    done({
      message:
        "Please check that your form fields are filled, and your password has a minimum length of 8",
    });
  }
};

const verifyCallback = async (email, password, done) => {
  validateEmailAndPassword(done);
  try {
    User.findOne({ email: email }, (err, user) => {
      if (err) return done(err);
      if (user) return done(null, false);
      const newUser = User();
      newUser.email = email;
      newUser.password = newUser.hashPassword(password);
      newUser.save((err, result) => {
        if (err) return done(err);
        return done(null, newUser);
      });
    });
  } catch (error) {}
};

const verifyLogin = async (email, password, done) => {
  try {
    User.findOne({ email: email }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!user.validatePassword(password)) return done(null, false);
      return done(null, user);
    });
  } catch (error) {}
};

const strategy = new LocalStrategy(customFields, verifyCallback);
const loginStrategy = new LocalStrategy(customFields, verifyLogin);

passport.use("local_signup", strategy);
passport.use("local_signin", loginStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  try {
    User.findById(userId).then((user) => done(null, user));
  } catch (error) {}
});
