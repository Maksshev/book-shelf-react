const express = require('express');
const router = express.Router();
const User = require('../models/user');


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

         res.json({
             isAuth: true,
             message: 'Password matched'
         })
      });

   })
});



module.exports = router;

