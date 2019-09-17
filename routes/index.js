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


//To get all the information and every existing task 
router.get("/dashboard", loginCheck(), (req, res, next) => {
  // task from the board
  Board.find().then(boards=> {
   res.render("dashboard", { boards, user: req.user })
  })  
});


//to create and post the tasks into the database and redirect back to dashboard-refresh the page
router.post("/dashboard", loginCheck(), (req, res, next) => {
  Board.create({ name: req.body.taskName, description: req.body.toDo }).then(() => {
    res.redirect('/dashboard')
  })  
});



module.exports = router;
