const express = require("express");
const passport = require('passport');
const router = express.Router();


router.get("/auth/slack", passport.authenticate("slack"));

router.get("/auth/slack/callback", passport.authenticate("slack", {
  successRedirect: "/dashboard",
  failureRedirect: "/auth/login"
}));


router.get("/auth/github", passport.authenticate("github"));
router.get("/auth/github/callback", passport.authenticate("github", {
  successRedirect: "/dashboard",
  failureRedirect: "/auth/login"
}));

module.exports = router;
