import {
  create,
  deleteOne,
  find,
  findOne,
  updateOne,
} from "../controllers/expedients";

var express = require("express");
var router = express.Router();

router.post("/", create);
router.get("/", find);
router.patch("/:id", updateOne);
router.get("/:id", findOne);
router.delete("/:id", deleteOne);
