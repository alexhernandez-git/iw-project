import express, { Express } from "express";
import dotenv from "dotenv";
import usersRouter from "./routes/users";
import expedientsRouter from "./routes/expedients";
import expedientTypesRouter from "./routes/expedient-types";
import userAuthentication from "./middlewares/userAuthentication";

dotenv.config();

const app: Express = express();
var cors = require("cors");
var path = require("path");
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

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
