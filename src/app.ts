import {getTemperatures} from "./service/hueService";
import {sendErrorMessage, sendTemperature} from "./service/laMetricService";
import {TemperatureStyle} from "./model/TemperatureStyle";

const TEMPERATURE_STYLE: TemperatureStyle = process.env.TEMPERATURE_STYLE ? TemperatureStyle[process.env.TEMPERATURE_STYLE] : TemperatureStyle.ALL;

getTemperatures(TEMPERATURE_STYLE).then(temperatures => {
    sendTemperature(temperatures)
}, error => {
    console.log(error)
    sendErrorMessage(error.message)
})