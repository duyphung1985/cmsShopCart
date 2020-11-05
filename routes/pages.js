const express = require('express');
const router = express.Router();

router.get('/',(req,res)=> res.render('index', {
    title: 'Home'
}))

router.get('/test',(req,res)=> res.send('Page test'))



module.exports = router;