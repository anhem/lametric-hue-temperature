import {HueTemperatureSensor} from "../client/model/hue/HueTemperatureSensor";
import {HueDevice} from "../client/model/hue/HueDevice";
import {getDevices, getTemperatureSensors} from "../client/hueBridgeClient";
import {TemperatureStyle} from "../model/TemperatureStyle";
import {Temperature} from "../model/Temperature";

export function getTemperatures(temperatureType: TemperatureStyle): Promise<Temperature[]> {
    switch (temperatureType) {
        case TemperatureStyle.ALL:
            return getAllTemperatures()
        case TemperatureStyle.HIGH_LOW:
            return getHighLowTemperature()
        case TemperatureStyle.AVERAGE:
            return getAverageTemperature()
    }
}

function getAllTemperatures(): Promise<Temperature[]> {
    return Promise.all([getDevices(), getTemperatureSensors()])
        .then(([hueDevices, hueTemperatures]) => toTemperatures(hueDevices, hueTemperatures));
}

function getHighLowTemperature(): Promise<Temperature[]> {
    return getAllTemperatures().then(temperatures => {
        if (temperatures.length > 1) {
            const highTemperature = getHighestTemperature(temperatures);
            const lowTemperature = getLowestTemperature(temperatures);
            return [
                {
                    name: "High",
                    shortName: "HI",
                    temperature: highTemperature.temperature
                }, {
                    name: "Low",
                    shortName: "LO",
                    temperature: lowTemperature.temperature
                }]
        }
        return temperatures
    })
}

function getAverageTemperature(): Promise<Temperature[]> {
    return getAllTemperatures().then(temperatures => {
        const sum = temperatures.reduce((acc, temperature) => {
            return acc + temperature.temperature;
        }, 0);

        const average = roundTemperatureToOneDecimal(sum / temperatures.length)
        return [{
            name: "Average",
            shortName: "~",
            temperature: average
        }]
    })
}

function getHighestTemperature(temperatures: Temperature[]) {
    return temperatures.reduce((previous, current) => {
        return current.temperature > previous.temperature ? current : previous;
    });
}

function getLowestTemperature(temperatures: Temperature[]) {
    return temperatures.reduce((previous, current) => {
        return current.temperature < previous.temperature ? current : previous;
    });
}

function toTemperatures(hueDevices: HueDevice[], hueTemperatures: HueTemperatureSensor[]) {
    return hueTemperatures.map(hueTemperature => toTemperature(hueDevices, hueTemperature))
}

function toTemperature(hueDevices: HueDevice[], hueTemperature: HueTemperatureSensor): Temperature {
    const hueDevice = hueDevices.find(hueDevice => hueDevice.id === hueTemperature.owner.rid);

    return hueDevice ? {
        name: hueDevice.metadata.name,
        shortName: hueDevice.metadata.name.slice(0, 2),
        temperature: roundTemperatureToOneDecimal(hueTemperature.temperature.temperature)
    } : {
        name: hueTemperature.id,
        shortName: hueTemperature.id.slice(0, 2),
        temperature: roundTemperatureToOneDecimal(hueTemperature.temperature.temperature)
    }
}

function roundTemperatureToOneDecimal(temperature: number) {
    return Math.round(temperature * 10) / 10
}
