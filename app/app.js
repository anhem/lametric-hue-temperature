import hueService from "./hueService";
import laMetricService from "./laMetricService";

hueService.getTemperatures().then(response => {
    laMetricService.pushTemperatureData(response);
}, error => {
    laMetricService.createErrorMessage(error);
});