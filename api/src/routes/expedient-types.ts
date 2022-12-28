import {
  create,
  deleteOne,
  find,
  findByParent,
  findFuncionalAreas,
  findNames,
  findOne,
  updateFile,
  updateOne,
} from "../controllers/expedient-types";
import { findAll } from "../controllers/expedient-types";

var express = require("express");
var router = express.Router();

router.post("/", create);
router.get("/", find);
router.get("/all", findAll);
router.patch("/files/:id", updateFile);
router.get("/funcional-areas", findFuncionalAreas);
router.get("/names", findNames);
router.get("/parent/:parent?", findByParent);
router.patch("/:id", updateOne);
router.get("/:id", findOne);
router.delete("/:id", deleteOne);

export default router;
