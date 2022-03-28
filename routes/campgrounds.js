const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const {isLoggedIn, validateCampground, isAuthor} = require('../middleware');
const campControl = require('../controllers/campControl');
const multer  = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });


router.route('/')
      .get(catchAsync(campControl.index))
      .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campControl.createCampground));
      

router.get('/new', isLoggedIn, campControl.renderNewForm);

router.route('/:id')
      .get(catchAsync(campControl.showCampground))
      .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campControl.updateCampground))
      .delete(isLoggedIn, isAuthor, catchAsync(campControl.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campControl.renderEditForm));

module.exports = router;