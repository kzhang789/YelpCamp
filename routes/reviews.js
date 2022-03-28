const express = require('express');
const router = express.Router({mergeParams: true});
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const ExpressError = require('../utils/ExpressError');
const reviewControl = require('../controllers/reviewControl');

router.post('/', isLoggedIn, validateReview, catchAsync(reviewControl.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviewControl.deleteReview));

module.exports = router;
