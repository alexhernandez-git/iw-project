import { create, login } from "../controllers/users";

var express = require("express");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var router = express.Router();

router.post("/register", create);
router.post("/login", login);
