import {
  create,
  deleteOne,
  findAll,
  getByToken,
  login,
  updateOne,
} from "../controllers/users";

var express = require("express");
var router = express.Router();

router.post("/register", create);
router.post("/login", login);
router.patch("/:id", updateOne);
router.get("/", findAll);
router.get("/get-user/:token", getByToken);
router.delete("/:id", deleteOne);

export default router;
