const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/catogeryController');

//GET Category
router.get('/',categoryController.showCategory);

//GET Add Category
router.get('/add-category',categoryController.addCategory);


module.exports = router;
