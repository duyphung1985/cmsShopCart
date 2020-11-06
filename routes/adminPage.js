const express = require("express");
const router = express.Router();
const controllerAdmin = require("../controllers/adminController");
const { check, resultValidation } = require("express-validator");
const { route } = require("./pages");

router.get('/edit-page/:slug',controllerAdmin.editPage);

router.post(
  "/edit-page/:slug",
  [
    check("title", "Title tối thiểu 5 ký tự").isLength({ min: 4 }),
    check("content", "Content không được để trống").notEmpty(),
  ],
  controllerAdmin.updatePage
);



router.get("/", controllerAdmin.showPage);

router.get("/add-page", controllerAdmin.addPage);

router.post(
  "/add-page",
  [
    check("title", "Title tối thiểu 5 ký tự").isLength({ min: 4 }),
    check("content", "Content không được để trống").notEmpty(),
  ],
  controllerAdmin.savePage
);

//Get Delete Page
router.get('/delete-page/:id',controllerAdmin.deletePage);



module.exports = router;
