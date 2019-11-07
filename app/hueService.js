import restClient from "./restClient";

const HUE_BRIDGE_IP = process.env.HUE_BRIDGE_IP;
const HUE_API_KEY = process.env.HUE_API_KEY;

const TEMPERATURE_SENSOR_TYPE = 'ZLLTemperature';

const hueService = {};

function findTemperatureSensors(json) {
    return Object.entries(json).filter(sensor => {
        return Object.values(sensor)[1].type === TEMPERATURE_SENSOR_TYPE
    });
}

function addSensorName(temperatureSensors, sensors) {
    return temperatureSensors.map(temperatureSensor => {
        const sensorId = parseInt(temperatureSensor[0]);
        const siblingSensor = sensors[sensorId + 1];
        temperatureSensor[1]['sname'] = (siblingSensor && siblingSensor.name) || `S${temperatureSensor[1].name.slice(-1)}`;
        return temperatureSensor;
    });
}

function insertDecimal(temperature) {
    return (temperature / 100).toFixed(1);
}

hueService.getTemperatures = () => {
    return new Promise((resolve, reject) => {
        const sensorsRequest = `http://${HUE_BRIDGE_IP}/api/${HUE_API_KEY}/sensors`;

        restClient.get(sensorsRequest)
            .then(sensors => {
                const temperatureSensors = findTemperatureSensors(sensors);
                const temperatureSensorsWithName = addSensorName(temperatureSensors, sensors);

                const temperatureData = temperatureSensorsWithName.map(temperatureSensor => {
                    return {
                        name: temperatureSensor[1].sname,
                        temperature: insertDecimal(temperatureSensor[1].state.temperature)
                    }
                });

                resolve(temperatureData);
            }, error => {
                console.log(error);
                reject(`Failed to fetch sensor information from hue bridge on ${HUE_BRIDGE_IP}`);
            });
    })


};

export default hueService;
