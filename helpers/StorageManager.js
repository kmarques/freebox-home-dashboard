import fs from "fs/promises";
import { constants } from "fs";

export default {
  save(filename, data) {
    return fs.writeFile(filename, JSON.stringify(data));
  },
  read(filename) {
    return fs
      .access(filename, constants.R_OK)
      .then(() => fs.readFile(filename, "utf8"))
      .then((data) => JSON.parse(data));
  },
};
