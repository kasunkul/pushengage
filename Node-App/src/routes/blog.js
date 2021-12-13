const express = require("express");
const controller = require("../controllers/blog");
const router = express.Router();
const checkAuth = require("../middleware/auth");

router.get(
    "/getAll", controller.getAll
);

router.get(
    "/get/:id", controller.getById
);

router.post(
    "/create", controller.create
);

router.post(
    "/saveComment", controller.saveComment
);


/*
  MIDDLEWARE = Request Body Data Validator Example : Not Used Currently in this Project
  const {
      findTreasureBoxesValidationRules,
      validate,
  } = require("../validations/validator.js");
*/

/*
    MIDDLEWARE = Request Body Data Validator and Authorization Example : Not Used Currently in this Project
    router.get(
        "/getAll", [checkAuth, findTreasureBoxesValidationRules(), validate],
        controller.findTreasureBoxes
    );
*/

module.exports = router;