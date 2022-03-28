const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const userControl = require('../controllers/userControl');

router.route('/register')
      .get(userControl.renderRegister)
      .post(catchAsync(userControl.register));

router.route('/login')
      .get(userControl.renderLogin)
      .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), userControl.login);

router.get('/logout', userControl.logout);

module.exports = router;