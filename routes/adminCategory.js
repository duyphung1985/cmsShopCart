const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/catogeryController');
const { check, validationResult } = require('express-validator');

//GET Category
router.get('/',categoryController.showCategory);

//GET Add Category
router.get('/add-category',categoryController.addCategory);

//POST Add Category
router.post('/add-category',[
    check('title','Title không được để trống').notEmpty(),
    check('title','Title độ dài tối thiểu 3 ký tự').isLength({min: 3}),
],categoryController.saveCategory)

//GET Edit Category
router.get('/edit-category/:slug',categoryController.editCategory);


//POST Edit Category
router.post('/edit-category/:slug',[
    check('title','Title không được để trống').notEmpty(),
    check('title','Title độ dài tối thiểu 3 ký tự').isLength({min: 3}),
]
,categoryController.updateCategory);

//POST Delete Category
router.get('/delete-category/:id',categoryController.removeCategory);


module.exports = router;
