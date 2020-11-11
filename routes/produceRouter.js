const express = require('express');
const router = express.Router();
const produceController = require('../controllers/produceController');
const mkdirp = require('mkdirp');
const fs = require('fs-extra');
const resizeImg = require('resize-img');
const { check, validationResult } = require('express-validator');

const upload = require('../middlewares/upload');


//Get Produce
router.get('/',produceController.showProduce)

//Get Add Produce
router.get('/add-produce',produceController.addProduce)

// POST Add Produce
router.post('/add-produce',upload,[
    check('title','Title không được để trống').notEmpty(),
    check('title','Dài tối thiểu 3 ký tự').isLength({min: 3}),
    check('price','Giá không được để trống'),
    check('price','Giá là kiểu số').isFloat(),
    check('desc','Mô tả không được để trống').notEmpty(), 
],produceController.saveProduce);

module.exports = router;