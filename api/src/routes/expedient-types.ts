import {
  create,
  deleteOne,
  find,
  findByParent,
  findOne,
  updateOne,
} from "../controllers/expedient-types";

var express = require("express");
var router = express.Router();

router.post("/", create);
router.get("/", find);
router.get("/parent/:parent?", findByParent);
router.patch("/:id", updateOne);
router.get("/:id", findOne);
router.delete("/:id", deleteOne);

export default router;
