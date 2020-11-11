const { validationResult } = require("express-validator");
const Category = require("../models/category");
const slug1 = require("slug");

class categoryController {
  showCategory(req, res) {
    Category.find({}, function (err, category) {
      res.render("admin/show_category", {
        title: "Category",
        category,
      });
    });
  }

  addCategory(req, res) {
    res.render("admin/add_category", {
      title: "Add new a Category",
    });
  }

  saveCategory(req, res) {
    var errors = validationResult(req).array();
    var slug = req.body.slug == "" ? slug1(req.body.title) : req.body.slug;
    if (errors.length > 0) {
      res.render("admin/add_category", {
        errors,
        title: "Add new a Category",
      });
    } else {
      Category.find({ slug: slug }, function (err, cat) {
        console.log(cat);
        if (cat.length > 0) {
          req.flash("danger", "Category Exits!!!");
          res.render("admin/add_category", {
            title: cat.title,
            slug: slug,
          });
        } else {
          let cat = new Category({
            title: req.body.title,
            slug: slug,
          });
          cat.save();
          req.flash("success", "Add new Category Success");
          res.redirect("/admin/category");
        }
      });
    }
  }

  //Edit Category
  editCategory(req, res) {
    var slug = req.params.slug;
    console.log(slug);
    Category.findOne({ slug: slug }, function (err, cat) {
        console.log(cat);
      res.render("admin/edit_category", {
        title: "Edit a Category",
        category: cat,
      });
    });
  }

  //Update Category
  updateCategory(req,res){
      var errors = validationResult(req).array();
      if(errors.length > 0){
          Category.findOne({slug: req.params.slug},function(err,category){
            res.render('admin/edit_category',{
                title: "Edit Category",
                errors,
                category
            })
          })
      } else {
        let id = req.body.id;
        Category.findOneAndUpdate({_id: id},{
            title: req.body.title,
            slug: req.body.slug == "" ? slug1(req.body.title) : req.body.slug
        },function(err){
            req.flash('success',"Edit category successfully!!!");
            res.redirect('/admin/category')
        })
      }
     
  }
  removeCategory(req,res){
      let id = req.params.id;
      Category.findOneAndRemove({_id: id},function(err){
          if(err){
              console.log(err);
          } else {
              req.flash('success',"Delete Category Successfully!!!");
              res.redirect('/admin/category');
          }
      })
  }



}

module.exports = new categoryController();
