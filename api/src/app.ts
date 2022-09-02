import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
var cors = require("cors");
var path = require("path");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
module.exports = app;
