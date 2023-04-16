import { Temperature } from "../model/Temperature";
import { LaMetricFrame } from "../client/model/lametric/LaMetricFrame";
import { LaMetricFrames } from "../client/model/lametric/LaMetricFrames";
import { sendFrames } from "../client/laMetricClient";
import logger from "../logger";

const TEMPERATURE_ICON = "2056";
const MESSAGE_DURATION = 4000;
const ERROR_MESSAGE_DURATION = 15000;

export function sendTemperature(temperatures: Temperature[]) {
  return sendFrames(createTemperatureMessage(temperatures));
}

export function sendErrorMessage(errorMessage: string) {
  return sendFrames(createErrorMessage(errorMessage));
}

function createTemperatureMessage(temperatures: Temperature[]): LaMetricFrames {
  const frames: LaMetricFrame[] = temperatures.map((temperature, index) => {
    return {
      text: `${temperature.shortName} ${temperature.temperature}`,
      icon: TEMPERATURE_ICON,
      index: index,
      duration: MESSAGE_DURATION,
    };
  });

  const laMetricFrames = {
    frames: frames,
  };
  logger.info("Message: " + JSON.stringify(laMetricFrames));
  return laMetricFrames;
}

function createErrorMessage(errorMessage: string): LaMetricFrames {
  const laMetricFrames = {
    frames: [
      {
        text: errorMessage,
        icon: TEMPERATURE_ICON,
        index: 0,
        duration: ERROR_MESSAGE_DURATION,
      },
    ],
  };
  logger.info("Error message: " + JSON.stringify(laMetricFrames));
  return laMetricFrames;
}
