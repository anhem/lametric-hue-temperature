import restClient from "./restClient";

const TEMPERATURE_ICON = '2056';
const MESSAGE_DURATION = 4000;
const ERROR_MESSAGE_DURATION = 15000;
const LAMETRIC_ACCESS_TOKEN = process.env.LAMETRIC_ACCESS_TOKEN;
const LAMETRIC_PUSH_URL = process.env.LAMETRIC_PUSH_URL;

const laMetricService = {};

laMetricService.pushTemperatureData = (temperatureData) => {
    return new Promise((resolve, reject) => {

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'X-Access-Token': LAMETRIC_ACCESS_TOKEN,
            'Cache-Control': 'no-cache'
        };

        const body = laMetricService.createTemperatureMessage(temperatureData);

        restClient.post(LAMETRIC_PUSH_URL, headers, body)
            .then(response => {
                resolve(response);
            }, error => {
                console.log(error);
                reject('Failed to push temperature data to LaMetric');
            });
    })
};

laMetricService.createTemperatureMessage = (temperatureData) => {
    const frames = temperatureData.map((data, index) => {
        return {
            text: `${data.name.substring(0, 2)} ${data.temperature}`,
            icon: TEMPERATURE_ICON,
            index: index,
            duration: MESSAGE_DURATION
        }
    });

    const response = {
        frames: frames
    };
    console.log('Message: ' + JSON.stringify(response));
    return response;
};

laMetricService.createErrorMessage = errorMessage => {
    const response = {
        frames: [
            {
                text: errorMessage,
                icon: TEMPERATURE_ICON,
                index: 0,
                duration: ERROR_MESSAGE_DURATION
            }
        ]
    };
    console.log('Error: ' + JSON.stringify(response));
    return response;
};

export default laMetricService