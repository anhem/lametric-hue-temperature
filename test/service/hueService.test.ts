'use strict';
import * as hueBridgeClient from "../../src/client/hueBridgeClient";
import {getTemperatures} from "../../src/service/hueService";
import {TemperatureStyle} from "../../src/model/TemperatureStyle";
import * as temperatures from '../data/temperatures.json';
import * as devices from '../data/devices.json';

describe('hueService', () => {

    jest.spyOn(hueBridgeClient, 'getDevices').mockResolvedValue(devices.data)
    jest.spyOn(hueBridgeClient, 'getTemperatureSensors').mockResolvedValue(temperatures.data)

    test('all temperatures are returned', async () => {
        expect(await getTemperatures(TemperatureStyle.ALL)).toEqual([
            {name: 'Living Room sensor', shortName: 'Li', temperature: 19.6},
            {name: 'Hallway sensor', shortName: 'Ha', temperature: 19.6},
            {name: 'Kitchen sensor', shortName: 'Ki', temperature: 19.5},
            {name: 'Bathroom sensor', shortName: 'Ba', temperature: 20.7},
            {name: 'Bedroom sensor', shortName: 'Be', temperature: 20.1}
        ])
    });

    test('average temperature is returned', async () => {
        expect(await getTemperatures(TemperatureStyle.AVERAGE)).toEqual([
            {name: 'Average', shortName: '~', temperature: 19.9},
        ])
    });

    test('highest and lowest temperatures are returned', async () => {
        expect(await getTemperatures(TemperatureStyle.HIGH_LOW)).toEqual([
            {name: 'High', shortName: 'HI', temperature: 20.7},
            {name: 'Low', shortName: 'LO', temperature: 19.5},
        ])
    });
});