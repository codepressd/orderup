import * as async from "async";
import * as jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";
import * as crypto from "crypto";
import * as nodemailer from "nodemailer";
import * as passport from "passport";
import { default as User, UserModel, AuthToken } from "../models/User";
import { Request, Response, NextFunction } from "express";
import { LocalStrategyInfo } from "passport-local";
import { WriteError } from "mongodb";
const request = require("express-validator");

const generateSalt = (length: number) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

const saltPass = (password: string, salt: string) => {
  const hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  const value = hash.digest("hex");
  return {
    salt,
    passwordHash: value,
  }
}

const saltHashPass = (userPassword: string) => {
  const salt = generateSalt(16);
  const passwordData = saltPass(userPassword, salt);
}

const generateToken = (user: any) => {
  return jwt.sign(user, jwtConfig.jwtSecret, { expiresIn: '4hr' });
}

const setUserInfo = (dataInfo: any) => {

  return {
    userId: request._id,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    parent: request.parent,
    email: request.email,
    isChild: request.isChild,
    childRole: request.childRole,
    profileImage: request.profile.profileImage,
    companyName: request.profile.companyName,
    companyLogo: request.profile.companyLogo,
    userView: request.userView,
    phone: request.profile.phone,
    role: request.role,
    address: request.profile.address,
    city: request.profile.city,
    state: request.profile.state,
    region: request.profile.region
  }
};

/**
 * Check Token and Generate Token
 */

interface decoded {
  userId: string;
}

const verifyToken = (req: Request, res: Response) => {
  const { token, userId } = req.body;
  if (!token) {
    return res.status(422).json({ success: false, message: 'Must have a token, please login!' })
  }

  jwt.verify(token.replace(/^JWT\s/, ''), jwtConfig.jwtSecret, function (err: Error, decoded: decoded) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(422).json({
          success: false,
          expireTime: true,
          message: 'Token expired, you need to login again.'
        });
      }
      return res.status(422).json({ success: false, message: 'Could not verify token' })
    } else {
      User.findOne({ _id: decoded.userId })
        .then((user) => {
          let userInfo = setUserInfo(user);
          res.status(201).json({
            success: true,
            token: 'JWT ' + generateToken(userInfo),
            user: userInfo
          });
        })
        .catch(err => res.status(422).json({ err }));
    }
  });

}

/**
 * GET /login
 * Login page.
 */
export let getLogin = (req: Request, res: Response) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("account/login", {
    title: "Login"
  });
};

/**
 * POST /login
 * Sign in using email and password.
 */
export let postLogin = (req: Request, res: Response, next: NextFunction) => {
  console.log(req, "this fired");
  req.assert("email", "Email is not valid").isEmail();
  req.assert("password", "Password cannot be blank").notEmpty();
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/login");
  }

  passport.authenticate("local", (err: Error, user: UserModel, info: LocalStrategyInfo) => {
    if (err) { return next(err); }
    if (!user) {
      req.flash("errors", info.message);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/");
    });
  })(req, res, next);
};

/**
 * GET /logout
 * Log out.
 */
export let logout = (req: Request, res: Response) => {
  req.logout();
  res.redirect("/");
};

/**
 * GET /signup
 * Signup page.
 */
export let getSignup = (req: Request, res: Response) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("account/signup", {
    title: "Create Account"
  });
};

/**
 * POST /signup
 * Create a new local account.
 */
export let postSignup = (req: Request, res: Response, next: NextFunction) => {
  req.assert("email", "Email is not valid").isEmail();
  req.assert("password", "Password must be at least 8 characters long").len({ min: 8 });
  req.assert("confirmPassword", "Passwords do not match").equals(req.body.password);
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/signup");
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password,
    parent: req.body.parentId,
    isChild: req.body.isChild,
    profile: {
      firstName: "",
      lastName: "",
      profileImage: "",
      companyName: req.body.businessName,
      companyLogo: "",
      address: "",
      phone: "",
      city: "",
      state: "",
      region: req.body.region,
      businessType: ""
    },
    role: req.body.role,
    childRole: req.body.childRole,
    userView: req.body.userView
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      req.flash("errors", { msg: "Account with that email address already exists." });
      return res.redirect("/signup");
    }
    user.save((err) => {
      if (err) { return next(err); }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    });
  });
};

/**
 * GET /account
 * Profile page.
 */
export let getAccount = (req: Request, res: Response) => {
  res.render("account/profile", {
    title: "Account Management"
  });
};

/**
 * POST /account/profile
 * Update profile information.
 */
export let postUpdateProfile = (req: Request, res: Response, next: NextFunction) => {
  req.assert("email", "Please enter a valid email address.").isEmail();
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/account");
  }

  User.findById(req.user.id, (err, user: UserModel) => {
    if (err) { return next(err); }
    user.email = req.body.email || "";
    user.profile.firstName = req.body.name || "";
    user.profile.lastName = req.body.gender || "";
    user.profile.phone = req.body.location || "";
    user.profile.address = req.body.website || "";
    user.save((err: WriteError) => {
      if (err) {
        if (err.code === 11000) {
          req.flash("errors", { msg: "The email address you have entered is already associated with an account." });
          return res.redirect("/account");
        }
        return next(err);
      }
      req.flash("success", { msg: "Profile information has been updated." });
      res.redirect("/account");
    });
  });
};

/**
 * POST /account/password
 * Update current password.
 */
export let postUpdatePassword = (req: Request, res: Response, next: NextFunction) => {
  req.assert("password", "Password must be at least 4 characters long").len({ min: 4 });
  req.assert("confirmPassword", "Passwords do not match").equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/account");
  }

  User.findById(req.user.id, (err, user: UserModel) => {
    if (err) { return next(err); }
    user.password = req.body.password;
    user.save((err: WriteError) => {
      if (err) { return next(err); }
      req.flash("success", { msg: "Password has been changed." });
      res.redirect("/account");
    });
  });
};

/**
 * POST /account/delete
 * Delete user account.
 */
export let postDeleteAccount = (req: Request, res: Response, next: NextFunction) => {
  User.remove({ _id: req.user.id }, (err) => {
    if (err) { return next(err); }
    req.logout();
    req.flash("info", { msg: "Your account has been deleted." });
    res.redirect("/");
  });
};

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
export let getOauthUnlink = (req: Request, res: Response, next: NextFunction) => {
  const provider = req.params.provider;
  User.findById(req.user.id, (err, user: any) => {
    if (err) { return next(err); }
    user[provider] = undefined;
    user.tokens = user.tokens.filter((token: AuthToken) => token.kind !== provider);
    user.save((err: WriteError) => {
      if (err) { return next(err); }
      req.flash("info", { msg: `${provider} account has been unlinked.` });
      res.redirect("/account");
    });
  });
};

/**
 * GET /reset/:token
 * Reset Password page.
 */
export let getReset = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  User
    .findOne({ passwordResetToken: req.params.token })
    .where("passwordResetExpires").gt(Date.now())
    .exec((err, user) => {
      if (err) { return next(err); }
      if (!user) {
        req.flash("errors", { msg: "Password reset token is invalid or has expired." });
        return res.redirect("/forgot");
      }
      res.render("account/reset", {
        title: "Password Reset"
      });
    });
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
export let postReset = (req: Request, res: Response, next: NextFunction) => {
  req.assert("password", "Password must be at least 4 characters long.").len({ min: 4 });
  req.assert("confirm", "Passwords must match.").equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.redirect("back");
  }

  async.waterfall([
    function resetPassword(done: Function) {
      User
        .findOne({ passwordResetToken: req.params.token })
        .where("passwordResetExpires").gt(Date.now())
        .exec((err, user: any) => {
          if (err) { return next(err); }
          if (!user) {
            req.flash("errors", { msg: "Password reset token is invalid or has expired." });
            return res.redirect("back");
          }
          user.password = req.body.password;
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          user.save((err: WriteError) => {
            if (err) { return next(err); }
            req.logIn(user, (err) => {
              done(err, user);
            });
          });
        });
    },
    function sendResetPasswordEmail(user: UserModel, done: Function) {
      const transporter = nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
      const mailOptions = {
        to: user.email,
        from: "express-ts@starter.com",
        subject: "Your password has been changed",
        text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
      };
      transporter.sendMail(mailOptions, (err) => {
        req.flash("success", { msg: "Success! Your password has been changed." });
        done(err);
      });
    }
  ], (err) => {
    if (err) { return next(err); }
    res.redirect("/");
  });
};

/**
 * GET /forgot
 * Forgot Password page.
 */
export let getForgot = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  res.render("account/forgot", {
    title: "Forgot Password"
  });
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
export let postForgot = (req: Request, res: Response, next: NextFunction) => {
  req.assert("email", "Please enter a valid email address.").isEmail();
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/forgot");
  }

  async.waterfall([
    function createRandomToken(done: Function) {
      crypto.randomBytes(16, (err, buf) => {
        const token = buf.toString("hex");
        done(err, token);
      });
    },
    function setRandomToken(token: AuthToken, done: Function) {
      User.findOne({ email: req.body.email }, (err, user: any) => {
        if (err) { return done(err); }
        if (!user) {
          req.flash("errors", { msg: "Account with that email address does not exist." });
          return res.redirect("/forgot");
        }
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour
        user.save((err: WriteError) => {
          done(err, token, user);
        });
      });
    },
    function sendForgotPasswordEmail(token: AuthToken, user: UserModel, done: Function) {
      const transporter = nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
      const mailOptions = {
        to: user.email,
        from: "hackathon@starter.com",
        subject: "Reset your password on Hackathon Starter",
        text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.headers.host}/reset/${token}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };
      transporter.sendMail(mailOptions, (err) => {
        req.flash("info", { msg: `An e-mail has been sent to ${user.email} with further instructions.` });
        done(err);
      });
    }
  ], (err) => {
    if (err) { return next(err); }
    res.redirect("/forgot");
  });
};

//Get Team Members

export const getTeamMembers = (req: Request, res: Response, next: NextFunction) => {


  User.find({
    parent: req.params.userId
  }, (err, members) => {
    if (err) {
      return next(err);
    }
    res.status(201).json({ members: members });
  });

};

//Get Child User Information

export const getChildUserInfo = (req: Request, res: Response, next: NextFunction) => {


  User.findOne({
    _id: req.params.userId
  }, function (err, user) {
    if (err) {
      return next(err);
    }

    res.status(201).json({ childUserInfo: user });
  })
};

//Remove Child User

export const removeChildUser = (req: Request, res: Response, next: NextFunction) => {

  console.log(req.params);

  // User.remove({

  //     _id: req.params.userId

  // }, function(err, product){
  //     if(err){
  //         return next(err);
  //     }
  //     res.status(201).json({message: 'Product Successfully Deleted!'});
  // });
}
