import { backUpDB } from "./src/utils/helpers";

const http = require("http");
const app = require("./src/app");
const server = http.createServer(app);

require("./src/config/database").connect();

const { API_PORT } = process.env;
const port = process.env.PORT || "8080";

const cron = require("node-cron");

// Scheduling the database backup every night
cron.schedule("00 00 00 * * *", () => backUpDB());

// server listening
server.listen(port, () => {
  console.info(`Server running on port ${port}`);
});
