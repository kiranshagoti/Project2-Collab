const express = require('express');
const router  = express.Router();
const Board = require("../models/Board")
const User = require('../models/User')


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
    res.redirect('dashboard.hbs')
  })  
});

router.get("/dashboard/profile", loginCheck(), (req, res) => {
  const loggedUser = req.user;
  res.render("profile", {user: loggedUser});
});

router.post("/dashboard/profile", loginCheck(), (req, res, next) => {

  const user = req.user
  const { title, email, phone, skype, location, birthday} = req.body
  User.findOneAndUpdate(
    {_id : user._id},
    {$set: {title, email, phone, skype, location, birthday}},
    {new: true}
    ).then(updatedUser => {
      console.log(updatedUser)
      res.redirect('/dashboard')
    }).catch(err => console.log(err))
});


router.get("/dashboard/settings", loginCheck(), (req, res) => {
  const loggedUser = req.user;
  res.render("settings", {user: loggedUser});
});


module.exports = router;
