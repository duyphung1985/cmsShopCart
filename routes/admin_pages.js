const express = require('express');
const router = express.Router();
const slg = require('slug');

//Get Page model
const Page = require('../models/page');

//GET Page index
router.get('/',function(req,res){
    res.send('Admin area');
})

//GET add page
router.get('/add-page',function(req,res){
    var title = "";
    var slug = "";
    var content = "";
    res.render('admin/add_page',{
        title,
        slug,
        content,
    })
})

//POST add page
router.post('/add-page',function(req,res){
    
    req.checkBody('title','Title must have a value.').notEmpty();
    req.checkBody('content','Content must have a value.').notEmpty();
    let title = req.body.title;
    let slug = req.body.slug ===""? slg(req.body.title):req.body.slug;
    let content = req.body.content;
    let errors = req.validationErrors();
    
    if(errors){
        res.render('admin/add_page',{
            errors,
            title,
            slug,
            content,
        }) 
    } else {
       Page.findOne({slug:slug},function(err,page){
           if(page){
               req.flash('warning','Page slug exists, choose another.');
               res.render('admin/add_page',{
                title,
                slug,
                content,
            }) 
           } else {
               let page = new Page({
                   title: title,
                   slug: slug,
                   content: content,
                   sorting: 0
               });
               page.save(function(err){
                   if(err) {
                    return console.log(err);
                   }
                   req.flash('success','Page Added!');
                   res.redirect('/admin/pages');
               })
           }
       })
    }
    
    res.render('admin/add_page',{
        title,
        slug,
        content,
    })
})


//Exports
module.exports = router;