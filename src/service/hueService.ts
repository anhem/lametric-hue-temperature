import {Temperature} from "../model/Temperature";
import {HueTemperatureSensor} from "../client/model/hue/HueTemperatureSensor";
import {HueDevice} from "../client/model/hue/HueDevice";
import {getDevices, getTemperatureSensors} from "../client/hueBridgeClient";

export function getTemperatures(): Promise<Temperature[]> {
    return Promise.all([getDevices(), getTemperatureSensors()])
        .then(([hueDevices, hueTemperatures]) => toTemperatures(hueDevices, hueTemperatures));
}

function toTemperatures(hueDevices: HueDevice[], hueTemperatures: HueTemperatureSensor[]) {
    return hueTemperatures.map(hueTemperature => toTemperature(hueDevices, hueTemperature))
}

function toTemperature(hueDevices: HueDevice[], hueTemperature: HueTemperatureSensor): Temperature {
    const hueDevice = hueDevices.find(hueDevice => hueDevice.id === hueTemperature.owner.rid);

    return hueDevice ? {
        name: hueDevice.metadata.name,
        shortName: hueDevice.metadata.name.slice(0, 2),
        temperature: hueTemperature.temperature.temperature
    } : {
        name: hueTemperature.id,
        shortName: hueTemperature.id.slice(0, 2),
        temperature: hueTemperature.temperature.temperature
    }
}
