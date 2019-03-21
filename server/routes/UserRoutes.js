const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

//register
router.post('/register', (req, res) => {
   const user = new User(req.body);
   user.save(user, (err, doc) => {
      if (err) return res.status(503).send(err);
      res.status(200).json({
          success: true,
          addedUser: doc
      });
   })
});

//login
router.post('/login', (req, res) => {
   User.findOne({email: req.body.email}, (err, user) => {
      if (err) return res.status(503).send('Something went wrong');

      if (!user) return res.json({
          isAuth: false,
          message: 'User not found'
      });

      user.comparePassword(req.body.password, (err, isMatch) => {
         if (!isMatch) return res.json({
             isAuth: false,
             message: 'Wrong password'
         });

         user.generateToken((err, user) => {
            if (err) return res.status(503).send('Something went wrong');
             res.cookie('token', user.token).json({
                 isAuth: true,
                 id: user._id,
                 email: user.email
             })
         });

      });

   })
});


//get reviewer

router.get('/getReviewer', (req, res) => {
   const id = req.query.id;
   User.findById(id, (err, doc) => {
      if (err) return res.status(404).send('Reviewer not found');
      res.json({
          name: doc.name,
          lastName: doc.lastName
      })
   })
});

//get reviewers

router.get('/', (req, res) => {
   User.find({}, (err, users) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(users);
   })
});


//logout

router.get('/logout', auth, (req, res) => {
   const user = req.user;
   user.deleteToken((err, tokenStatus) => {
      if (err) return res.status(400).send(err);
      res.json(tokenStatus);
   });
});


//check auth

router.get('/auth', auth, (req, res) => {
    res.json({
        isAuth: true,
        user: req.user
    })
});





module.exports = router;

