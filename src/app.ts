import { getTemperatures } from "./service/hueService";
import { sendErrorMessage, sendTemperature } from "./service/laMetricService";
import { TemperatureStyle } from "./model/TemperatureStyle";
import logger from "./logger";

const TEMPERATURE_STYLE: TemperatureStyle = process.env.TEMPERATURE_STYLE
  ? TemperatureStyle[process.env.TEMPERATURE_STYLE]
  : TemperatureStyle.ALL;

getTemperatures(TEMPERATURE_STYLE).then(
  (temperatures) => {
    sendTemperature(temperatures).catch((error) =>
      logger.error(`Failed to send temperature: ${error}`)
    );
  },
  (error) => {
    logger.error(error);
    sendErrorMessage(error.message).catch((error) =>
      logger.error(`Failed to send error: ${error}`)
    );
  }
);
