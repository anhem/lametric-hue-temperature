import {get} from "./restClient";
import {HueTemperatureSensor} from "./model/hue/HueTemperatureSensor";
import {HueDevice} from "./model/hue/HueDevice";

const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'hue-application-key': process.env.HUE_API_KEY,
    'Cache-Control': 'no-cache'
};
const BASE_URL = `https://${(process.env.HUE_BRIDGE_IP)}`;
const TEMPERATURE_SENSORS_GET_URL = `${BASE_URL}/clip/v2/resource/temperature`
const DEVICES_GET_URL = `${BASE_URL}/clip/v2/resource/device`

export const getTemperatureSensors = (): Promise<HueTemperatureSensor[]> => {
    return get(TEMPERATURE_SENSORS_GET_URL, HEADERS)
        .then(response => {
            return response.data;
        }, error => {
            console.log("Error while getting temperature sensors: " + JSON.stringify(error))
        })
}

export const getDevices = (): Promise<HueDevice[]> => {
    return get(DEVICES_GET_URL, HEADERS)
        .then(response => {
            return response.data;
        }, error => {
            console.log("Error while getting devices: " + JSON.stringify(error))
        })
}