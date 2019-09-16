const express = require('express');
const router  = express.Router();


const loginCheck = () => {
  return (req, res, next) => {
    if (req.user) {
      // if user is logged in, proceed to the next function
      next();
    } else {
      // else if user is not logged in, redirect to /login
      res.redirect("/");
    }
  };
};

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.get("/dashboard", loginCheck(), (req, res, next) => {
  res.render("dashboard", { user: req.user});
});



module.exports = router;
