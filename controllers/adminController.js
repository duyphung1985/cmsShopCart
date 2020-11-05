const pageModel = require("../models/page");
const slug1 = require("slug");
const { validationResult } = require("express-validator");

class adminController {
  //GET page index
  showPage(req, res) {
    res.render("adminPage", {
      title: "Admin Page",
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
    let title = req.body.title;
    let slug = req.body.slug == "" ? slug1(req.body.title): req.body.slug;
    let content = req.body.content;

    var errors = validationResult(req).array();
    if (errors.length > 0) {
      console.log(errors);
      res.render("admin/add_page", {
        title,
        slug,
        content,
        errors,
      });
    } else {

      res.render("admin/add_page", {
        title: title,
        slug: slug,
        content: content,
      });
    }
  }
}

module.exports = new adminController();
