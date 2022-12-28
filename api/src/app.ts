import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/users";
import expedientsRouter from "./routes/expedients";
import expedientTypesRouter from "./routes/expedient-types";
import userAuthentication from "./middlewares/userAuthentication";
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");
const fileUpload = require("express-fileupload");
dotenv.config();
const app: Express = express();
var cors = require("cors");
app.use(morgan("dev"));
var path = require("path");
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/files", express.static("/api/uploads"));
app.use("/api/users", usersRouter);
app.use("/api/expedients", userAuthentication, expedientsRouter);
app.use("/api/expedient-types", userAuthentication, expedientTypesRouter);
app.use(
  "api/",
  router.get("/", function (req, res, next) {
    res.send({ response: "ok" });
  })
);

export default app;
