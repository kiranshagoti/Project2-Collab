const express = require('express');
const router  = express.Router();
const Board = require("../models/Board")

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
  // task from the board
  Board.find().then(boards=> {
   res.render("dashboard", { boards, user: req.user })
  })  
});

router.post("/dashboard", loginCheck(), (req, res, next) => {
  Board.create({ name: req.body.taskName, description: req.body.toDo }).then(() => {
    res.redirect('/dashboard')
  })  
});



module.exports = router;
