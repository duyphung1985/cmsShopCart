const express = require("express");
const router = express.Router();
const controllerAdmin = require("../controllers/adminController");
const { check, resultValidation } = require("express-validator");

router.get("/", controllerAdmin.showPage);

router.get("/add-page", controllerAdmin.addPage);

router.post(
  "/add-page",
  [
    check("title", "Title tối thiểu 5 ký tự").isLength({ min: 5 }),
    check("content", "Content không được để trống").isEmpty(),
  ],
  controllerAdmin.savePage
);

module.exports = router;
