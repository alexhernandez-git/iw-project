import { create, getByToken, login } from "../controllers/users";

var express = require("express");
var router = express.Router();

router.post("/register", create);
router.post("/login", login);
router.get("/get-user/:token", getByToken);

export default router;
