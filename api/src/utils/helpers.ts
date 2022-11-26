import { ExpedientType } from "../models/expedient-type";

const { spawn } = require("child_process");
const path = require("path");

const DB_NAME = "users";

const BACKUP_PATH = path.join(__dirname, "public", `${DB_NAME}.gzip`);

export const backUpDB = () => {
  const child = spawn("mongodump", [
    `--db=${DB_NAME}`,
    `--archive=${BACKUP_PATH}`,
    "--gzip",
  ]);
  child.stdout.on("data", (data: any) => {
    console.log("stdoup", data);
  });
  child.stderr.on("data", (data: any) => {
    console.log("stdoup", Buffer.from(data).toString());
  });
  child.on("error", (err: any) => {
    console.log(err);
  });
  child.on("exit", (code: any, signal: any) => {
    if (code) {
      console.log("process exit with code", code);
    } else if (signal) {
      console.log("process killed with signal", signal);
    } else {
      console.log("back up success");
    }
  });
};

export const getAreaFuncional = async (id) => {
  const expedientTypeWithParents = await ExpedientType.findById(id).populate(
    "tramitePadre"
  );
  if (expedientTypeWithParents.isAreaFuncional) {
    return expedientTypeWithParents;
  }
  if (!expedientTypeWithParents.tramitePadre) {
    return null;
  }
  return await getAreaFuncional(expedientTypeWithParents?.tramitePadre?._id);
};
