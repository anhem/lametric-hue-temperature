import { post } from "./restClient";
import { LaMetricFrames } from "./model/lametric/LaMetricFrames";
import logger from "../logger";

const LAMETRIC_PUSH_URL = process.env.LAMETRIC_PUSH_URL;
const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "X-Access-Token": process.env.LAMETRIC_ACCESS_TOKEN,
  "Cache-Control": "no-cache",
};

export function sendFrames(laMetricFrames: LaMetricFrames): Promise<void> {
  return post(LAMETRIC_PUSH_URL, HEADERS, laMetricFrames)
    .then(() => {
      logger.debug("Sent frames to laMetric");
      return Promise.resolve();
    })
    .catch((error) => {
      logger.error("Error while sending frames to laMetric:", error);

      return Promise.reject(error.message);
    });
}
