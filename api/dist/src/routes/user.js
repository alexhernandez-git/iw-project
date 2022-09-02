"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
var express = require("express");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var router = express.Router();
router.post("/register", users_1.create);
router.post("/login", users_1.login);
