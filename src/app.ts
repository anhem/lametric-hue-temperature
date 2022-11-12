import {getTemperatures} from "./service/hueService";
import {sendErrorMessage, sendTemperature} from "./service/laMetricService";

getTemperatures().then(temperatures => {
    sendTemperature(temperatures)
}, error => {
    console.log(error)
    sendErrorMessage(error.message)
})