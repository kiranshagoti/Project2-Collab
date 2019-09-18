const express = require('express');
const router = express.Router();
const Board = require('../models/Board');
const User = require('../models/User');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

const loginCheck = () => {
    return (req, res, next) => {
        if (req.user) {
            // if user is logged in, proceed to the next function
            next();
        } else {
            // else if user is not logged in, redirect to /login
            res.redirect('/');
        }
    };
};

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index');
});

//To get all the information and every existing task
router.get('/dashboard', loginCheck(), (req, res, next) => {
    // task from the board

    Board.findOne()
        .then(board => {
            User.find().then(data => {
                // const nameList = data.map(user => {
                //   return user.username
                // })
                // console.log(nameList);
                res.render('dashboard', { names: data, tasks: board.tasks });
            });
        })

        .catch(err => console.log(err));
});

//to create and post the tasks into the database and redirect back to dashboard-refresh the page
router.post('/dashboard', loginCheck(), upload.single('files'), (req, res, next) => {
    const { name, responsible, status, dueDate, priority, comment, files } = req.body;
    console.log('---------', name, responsible, status, dueDate, priority, comment, files);
    Board.findOne()
        .then(board => {
            board.tasks.push({
                name,
                responsible,
                status,
                dueDate,
                priority,
                comment,
                files: {
                    name: req.file.originalname,
                    path: `uploads/${req.file.filename}`,
                    contentType: req.file.mimetype
                }
            });
            board.save().then(() => {
                res.redirect('/dashboard');
            });
        })
        .catch(err => console.log(err))
        // Board.create(
        //   {
        //     tasks: [
        //       {
        //         name,
        //         responsible,
        //         status,
        //         dueDate,
        //         priority,
        //         comment,
        //         files: {
        //           name: req.file.originalname,
        //           path: `uploads/${req.file.filename}`,
        //           contentType: req.file.mimetype
        //         }
        //       }
        //     ]
        //   })
        .then(newTask => {
            console.log('++++++++', newTask);
            res.redirect('/dashboard');
        });
});

router.post('/dashboard/delete/:taskID', (req, res, next) => {
    const taskID = req.params.taskID;
    console.log('++++++++++++++', taskID);
    Board.find().then(board => {
        console.log(board);
        Board.findByIdAndUpdate(board[0]._id, { $pull: { tasks: { _id: taskID } } }).then(data => {
            res.redirect('/dashboard');
        });
    });
});

router.get('/dashboard/profile', loginCheck(), (req, res) => {
    const loggedUser = req.user;
    res.render('profile', { user: loggedUser });
});

router.post('/dashboard/profile', loginCheck(), (req, res, next) => {
    const user = req.user;
    const { title, email, phone, skype, location, birthday } = req.body;
    User.findOneAndUpdate(
        { _id: user._id },
        { $set: { title, email, phone, skype, location, birthday } },
        { new: true }
    )
        .then(updatedUser => {
            console.log(updatedUser);
            res.redirect('/dashboard');
        })
        .catch(err => console.log(err));
});

router.get('/dashboard/settings', loginCheck(), (req, res) => {
    const loggedUser = req.user;
    res.render('settings', { user: loggedUser });
});

module.exports = router;
