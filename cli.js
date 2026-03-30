import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { sendRequest } from "./request.js";
import { formatResponse } from "./formatter.js";
import { analyzeError } from "./errorHelper.js";

export async function run() {
  const argv = yargs(hideBin(process.argv))
    .option("url", { type: "string", demandOption: true })
    .option("method", { type: "string", default: "GET" })
    .option("header", { type: "array" })
    .option("data", { type: "string" })
    .help().argv;

  try {
    const res = await sendRequest(argv);
    formatResponse(res);
  } catch (err) {
    analyzeError(err);
  }
}
