const { render } = require('ejs');
const express = require('express');
const { route } = require('./pages');
const router = express.Router();

router.get('/',(req,res)=> res.render('adminPage',{
    title: 'Admin Page'
}))

module.exports = router;