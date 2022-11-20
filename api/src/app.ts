import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/users";
import expedientsRouter from "./routes/expedients";
import expedientTypesRouter from "./routes/expedient-types";
import userAuthentication from "./middlewares/userAuthentication";
import fs from "fs";
const bodyParser = require("body-parser");
const morgan = require("morgan");
var multer = require("multer");
const _ = require("lodash");
const fileUpload = require("express-fileupload");
dotenv.config();
const app: Express = express();
var cors = require("cors");

app.use(morgan("dev"));
var path = require("path");

const router = express.Router();

app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/files", express.static("/api/uploads"));
app.use("/users", usersRouter);
app.use("/expedients", userAuthentication, expedientsRouter);
app.use("/expedient-types", userAuthentication, expedientTypesRouter);
app.use(
  "/",
  router.get("/", function (req, res, next) {
    res.send({ response: "ok" });
  })
);

export default app;
