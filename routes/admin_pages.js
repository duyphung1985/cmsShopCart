const express = require("express");
const router = express.Router();
const slg = require("slug");

//Get Page model
var Page = require("../models/page");
const { route } = require("./pages");

//GET Page index
router.get("/", function (req, res){
    Page.find().sort({sorting: 1}).exec(function(err,pages){
        res.render('admin/pages',{
            pages
        })
    })
});

//GET add page
router.get("/add-page", function (req, res) {
  var title = "";
  var slug = "";
  var content = "";
  res.render("admin/add_page", {
    title,
    slug,
    content,
  });
});

//POST add page
router.post("/add-page", function (req, res) {
  req.checkBody("title", "Title must have a value.").notEmpty();
  req.checkBody("content", "Content must have a value.").notEmpty();
  let title = req.body.title;
  let slug = req.body.slug === "" ? slg(req.body.title) : req.body.slug;
  let content = req.body.content;
  let errors = req.validationErrors();

  if (errors) {
    res.render("admin/add_page", {
      errors,
      title,
      slug,
      content,
    });
  } else {
    Page.findOne({ slug: slug }, function (err, page) {
      if (page) {
        req.flash("warning", "Page slug exists, choose another.");
        res.render("admin/add_page", {
          title,
          slug,
          content,
        });
      } else {
        var page = new Page({
          title: title,
          slug: slug,
          content: content,
          sorting: 100,
        });
        page.save(function(err){
            if(err) return console.log(err);
            req.flash("success", "Page Added!");
            res.redirect("/admin/pages");
        });
      }
    });
  }
});

//POST reorder pages
router.post('/reorder-pages',function(req,res){
    console.log('AAAAA')
})

//GET Edit Page
router.get('/edit-page/:slug',function(req,res){
    let slug = req.params.slug;
    Page.findOne({ slug: slug },function(err,page){
        res.render('admin/edit_page',{
            page
        })
    })
})

//POST Edit Page
router.post('/edit-page',function(req,res){
   req.checkBody('title','Title must have a value.').notEmpty();
   req.checkBody('content','Content must have a value.').notEmpty();
   let title = req.body.title;
   let slug = req.body.slug ==="" ? slg(req.body.title) : req.body.slug;
   let content = req.body.content;
   let page = new Page({
       title: title,
       slug:slug,
       content: content,
       sorting: 100
   })
   let errors = req.validationErrors();
   if(errors){
       res.render('admin/edit_page',{
           errors,
           page,
       })
   } else {
       Page.findOne({slug: slug},function(err,page){
           if(page){
               req.flash('danger','Page Slug exists, choose another.');
               res.render('admin/edit_page',{
                   page
               })
           } else {
               Page.findByIdAndUpdate(req.body.hdnId,{
                   title: title,
                   slug: slug,
                   content: content,
               },function(err){
                   if(err){
                    console.log(err);
                   } else {
                       req.flash('success','Page Edited!');
                       res.redirect('/admin/pages');
                   }
               })
           }
       })
   }
})

router.get('/delete-page/:id',function(req,res){
    Page.findByIdAndRemove(req.params.id,function(err){
        if(err){
            return console.log(err);
        } else {
            req.flash('success','Page Deleted!');
            res.redirect('/admin/pages');
        }
    })
})

//Exports
module.exports = router;
