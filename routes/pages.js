const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.get('/',pageController.showPage)

router.get('/test',pageController.test);



module.exports = router;