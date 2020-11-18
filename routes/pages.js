const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    res.render('index',
    {
        title: "Home"
    });
})

router.get('/test',function(req,res){
    res.send('Test');
})

//Exports
module.exports = router;