const express = require('express');
const router = express.Router();
const slg = require('slug');
const Categories = require('../models/category')


//GET Categories
router.get('/',function(req,res){
   Categories.find(function(err,categories){
      res.render('admin/categories',{
         categories
      })
   })
});

//GET Add Category
router.get('/add-category',function(req,res){
   res.render('admin/add_category',{
      title:"",
      slug:"",
   });
});

//POST Add Category
router.post('/add-category',function(req,res){
   
   req.checkBody('title','Title must have a value.').notEmpty();
   console.log(req.body.title)
   let title = req.body.title;
   let slug = req.body.slug === "" ? slg(req.body.title) : req.body.slug;
   console.log(req.body.slug)
   var errors = req.validationErrors();
   console.log(errors);
   if(errors){
      res.render('admin/add_category',{
         errors,
         title,
         slug
      })
   } else{
      Categories.findOne({slug :slug},function(err,category){
         if(category) {
            req.flash('danger','Slug Category exists, choose another!');
            res.render('admin/add_category',{
               title,
               slug,
            })
         } else {
            var category = new Categories({
               title: title,
               slug: slug,
            })
            category.save(function(err){
               if(err) {
                  return console.log(err)
               }
               req.flash('success','Category Added!');
               res.redirect('/admin/categories');
            })
         }
      })
   }
})


module.exports = router;