const Page = require("../models/page");
const slug1 = require("slug");
const { validationResult } = require("express-validator");

class adminController {
  //GET page index
  showPage(req, res) {
    Page.find({})
      .sort({ sorting: "asc" })
      .exec(function (err, page) {
        res.render("admin/show_page", {
          title: "Show Page",
          page,
        });
      });
  }

  //GET add page
  addPage(req, res) {
    let title = "";
    let slug = "";
    let content = "";

    res.render("admin/add_page", {
      title: title,
      slug: slug,
      content: content,
    });
  }
  //POST add page
  savePage(req, res, next) {
    let count = 0;
    let title = req.body.title;
    let slug = req.body.slug == "" ? slug1(req.body.title) : req.body.slug;
    let content = req.body.content;

    var errors = validationResult(req).array();
    if (errors.length > 0) {
      res.render("admin/add_page", {
        title,
        slug,
        content,
        errors,
      });
    } else {
      //Sắp sếp trang
      Page.find({}, function (err, data) {
        count = data.length + 1;
      });

      Page.findOne({ slug: slug }, function (err, page) {
        if (page) {
          req.flash("danger", "Page slug exists, choose another.");
          res.render("admin/add_page", {
            title,
            slug,
            content,
          });
        } else {
          let page = new Page({
            title: title,
            slug: slug,
            content: content,
            sorting: count,
          });
          page.save(function (err) {
            if (err) return console.log(err);
            req.flash("success", "Page added!");
            res.render("admin/show_page");
          });
        }
      });
    }
  }

  //GET Edit Page
  editPage(req, res) {
    console.log(req.params.slug);
    Page.findOne({ slug: req.params.slug }, function (err, data) {
      console.log(data);
      res.render("admin/edit_page", {
        title: "Edit Page",
        data,
      });
    });
  }

  //POST Update Page
  updatePage(req, res) {
    let data = new Page({
      title: req.body.title,
      slug: req.body.slug,
      content: req.body.content,
    });
    let id = req.body._id;
    console.log(errors);

    var errors = validationResult(req).array();
    if (errors.length > 0) {
      res.render("admin/edit_page", {
        title: "Add new page",
        data,
        errors,
      });
    } else {
      Page.findByIdAndUpdate(
        { _id: id },
        {
          title: req.body.title,
          slug: req.body.slug == "" ? slug1(req.body.title) : req.body.slug,
          content: req.body.content,
        },
        function (err, page) {
          res.redirect("/admin/pages");
        }
      );
    }
  }
}
module.exports = new adminController();
